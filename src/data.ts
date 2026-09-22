export interface Activity {
  id: number;
  title: string;
  cat: string;
  date: string; // "09.20"
  weekday: string;
  timeFull: string; // "09月20日 周六 14:00–16:30"
  place: string; // "T-ONE创新中心 · 2F 多功能厅"
  free: boolean;
  price?: number;
  oldPrice?: number;
  cap: number; // 0 = 不限名额
  enrolled: number;
  hot?: boolean;
  featured?: boolean;
  full?: boolean;
  wait?: boolean;
  closed?: boolean;
  pre?: string; // 即将报名提示文案
  week?: boolean; // 本周
  intro: string;
  agenda?: string;
}

export interface NewsItem {
  id: number;
  icon: "cube" | "check" | "award";
  text: string;
  time: string;
}

export interface Company {
  id: number;
  name: string;
  intro: string;
  industry: string;
  stage: string;
  need: string;
}

export const activities: Activity[] = [
  {
    id: 2,
    title: "大模型落地创业沙龙 №9 · 从 Demo 到交付",
    cat: "沙龙",
    date: "09.20",
    weekday: "周六",
    timeFull: "09月20日 周六 14:00–16:30",
    place: "T-ONE创新中心 · 2F 多功能厅",
    free: true,
    cap: 100,
    enrolled: 86,
    hot: true,
    week: true,
    intro:
      "三家已跑通付费交付的团队拆解真实项目：报价、交付、回款与踩坑。全程干货 + 圆桌问答。",
    agenda:
      "14:00 签到\n14:30 分享一：传统行业客户的验收标准\n15:10 分享二：小团队如何守住交付底线\n15:50 圆桌：从 Demo 到回款，中间隔着什么\n16:30 合影结束",
  },
  {
    id: 1,
    title: "AI 原生应用闭门路演 · 第 3 期",
    cat: "路演",
    date: "09.17",
    weekday: "周四",
    timeFull: "09月17日 周四 14:00–17:00",
    place: "T-ONE创新中心 · 3F 路演厅",
    free: true,
    cap: 100,
    enrolled: 86,
    closed: true,
    featured: true,
    week: true,
    intro: "8 支在孵团队 AI 原生应用 Demo 展示，4 位一线投资人现场点评，闭门深度交流。",
    agenda: "14:30 开场\n14:40 八支团队路演（每队 8 分钟 + 5 分钟点评）\n16:40 自由交流 · 茶歇",
  },
  {
    id: 7,
    title: "软件人才专场招聘会 · 秋季场",
    cat: "招聘",
    date: "09.19",
    weekday: "周五",
    timeFull: "09月19日 周五 09:30–15:00",
    place: "T-ONE创新中心 · 1F 中庭",
    free: true,
    cap: 150,
    enrolled: 120,
    hot: true,
    week: true,
    intro: "32 家在孵与生态企业现场招聘，技术岗为主，简历直达 HR。",
  },
  {
    id: 4,
    title: "AIGC 电商实战工作坊 · 从选品到素材",
    cat: "培训",
    date: "09.22",
    weekday: "周二",
    timeFull: "09月22日 周二 09:30–12:00",
    place: "线上 · 腾讯会议",
    free: false,
    price: 299,
    oldPrice: 399,
    cap: 40,
    enrolled: 40,
    full: true,
    wait: true,
    week: true,
    intro: "半天实操：用 AIGC 工具完成一次完整的电商素材生产，带着自己的品来。",
  },
  {
    id: 3,
    title: "跨境电商新政宣讲会 · 通关与结汇",
    cat: "政策宣讲",
    date: "09.25",
    weekday: "周四",
    timeFull: "09月25日 周四 09:30–11:30",
    place: "T-ONE创新中心 · 2F 多功能厅",
    free: true,
    cap: 0,
    enrolled: 45,
    intro: "海关与外汇新政逐条解读，现场答疑，资料可下载。",
  },
  {
    id: 6,
    title: "AI 原生组织诊断工作坊",
    cat: "培训",
    date: "09.29",
    weekday: "周一",
    timeFull: "09月29日 周一 09:30–17:00",
    place: "T-ONE创新中心 · 共享会议室A",
    free: false,
    price: 199,
    cap: 60,
    enrolled: 34,
    intro: "基于组织诊断模型的实操工作坊，输出本企业的能力优化路线图。",
  },
  {
    id: 5,
    title: "投资人下午茶 · 智织专场（第 8 期）",
    cat: "社群活动",
    date: "10.10",
    weekday: "周六",
    timeFull: "10月10日 周六 15:00–17:00",
    place: "T-ONE创新中心 · 顶层花园",
    free: true,
    cap: 20,
    enrolled: 0,
    pre: "10.08 10:00 开启报名",
    intro: "6 席小规模闭门茶叙，与投资人面对面聊融资卡点。",
  },
];

export const newsFeed: NewsItem[] = [
  { id: 1, icon: "cube", text: "超衍智能发布新一代工业质检模型", time: "2小时前" },
  { id: 2, icon: "check", text: "面壁智能完成新一轮战略融资", time: "昨天" },
  { id: 3, icon: "award", text: "星途科技入选加速营毕业项目", time: "5天前" },
];

export const companies: Company[] = [
  { id: 1, name: "超衍智能", intro: "新一代工业质检模型", industry: "AI 制造", stage: "A轮", need: "融资对接" },
  { id: 2, name: "面壁智能", intro: "端侧大模型解决方案", industry: "大模型", stage: "战略融资", need: "融资对接" },
  { id: 3, name: "星途科技", intro: "商业航天测控服务", industry: "航天", stage: "天使轮", need: "资源合作" },
  { id: 4, name: "岚光生物", intro: "AI 蛋白设计平台", industry: "AI 医疗", stage: "Pre-A", need: "招聘" },
  { id: 5, name: "岱舆数据", intro: "企业数据治理中台", industry: "数据服务", stage: "未融资", need: "资源合作" },
  { id: 6, name: "衡宇机器人", intro: "仓储物流机器人", industry: "机器人", stage: "A轮", need: "融资对接" },
];

export const categories = ["全部", "路演", "培训", "沙龙", "政策宣讲", "招聘", "社群活动"];

/** 状态角标（按 PRD：绿=可报名 橙=紧张 灰=不可 紫=未开启） */
export function badgeOf(a: Activity): { label: string; cls: string } {
  if (a.pre) return { label: "即将报名", cls: "bg-[#efeaf6] text-[#6e6394]" };
  if (a.full) return { label: a.wait ? "已满 · 可候补" : "已满", cls: "bg-[#f0eff2] text-[#8a8496]" };
  if (a.closed) return { label: "报名截止", cls: "bg-[#f0eff2] text-[#8a8496]" };
  const left = a.cap ? a.cap - a.enrolled : Infinity;
  if (a.cap && left <= 15) return { label: `仅剩 ${left} 席`, cls: "bg-[#fdf1e7] text-[#c0762a]" };
  return { label: "报名中", cls: "bg-[#e8f5ec] text-[#3a8a58]" };
}

export function priceText(a: Activity): string {
  return a.free ? "免费" : `¥${a.price}`;
}
