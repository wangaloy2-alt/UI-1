import { execFileSync } from 'node:child_process';

// Collaborators can deploy Pages artifacts even when they cannot change the
// owner's legacy source setting. Never let that legacy run publish after us.
const api = path => JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8' }));
const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
if (!repo || !sha) throw new Error('Missing GitHub repository or source SHA');
const pages = api(`repos/${repo}/pages`);
if (pages.build_type === 'legacy') {
  const deadline = Date.now() + 5 * 60 * 1000;
  let completed = false;
  while (Date.now() < deadline) {
    const runs = api(`repos/${repo}/actions/runs?head_sha=${sha}&per_page=100`).workflow_runs;
    const legacy = runs.filter(run => run.name === 'pages build and deployment');
    if (legacy.length && legacy.every(run => run.status === 'completed')) {
      completed = true;
      console.log('Legacy Pages run completed; publishing compiled dist last.');
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  if (!completed) throw new Error('Legacy Pages run has not completed; refuse an unordered deployment.');
} else if (pages.build_type === 'workflow') {
  console.log('Pages uses Actions; no legacy publisher to wait for.');
} else {
  throw new Error(`Unknown Pages build type: ${pages.build_type}`);
}
