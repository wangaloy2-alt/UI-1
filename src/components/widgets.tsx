import type { Activity } from "@/data";
import { badgeOf } from "@/data";

export function Badge({ a }: { a: Activity }) {
  const b = badgeOf(a);
  return <span className={`text-[10px] font-bold px-2 py-[3px] rounded-md ${b.cls}`}>{b.label}</span>;
}

export function Price({ a, size = "md" }: { a: Activity; size?: "md" | "lg" }) {
  if (a.free)
    return (
      <span className={`font-bold text-[#3a8a58] ${size === "lg" ? "text-[18px]" : "text-[12px]"}`}>免费</span>
    );
  return (
    <span className={`font-bold text-[#4e4470] font-mono ${size === "lg" ? "text-[18px]" : "text-[15px]"}`}>
      ¥{a.price}
      {a.oldPrice && (
        <span className="text-[10px] font-normal text-[#b5b0bd] line-through ml-1">¥{a.oldPrice}</span>
      )}
    </span>
  );
}

/** 本周精选（莫兰迪色块大卡，类似行程中的进行卡） */
export function FeaturedBanner({ a, onClick }: { a: Activity; onClick: () => void }) {
  const pct = a.cap ? Math.min(100, Math.round((a.enrolled / a.cap) * 100)) : 0;
  return (
    <button onClick={onClick} className="w-full text-left relative overflow-hidden rounded-[28px] p-5 bg-gradient-to-br from-[#e4def0] via-[#dcd4ea] to-[#cfc4e0] active:scale-[0.99] transition">
      {/* 顶部标签行 */}
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-extrabold tracking-[2.5px] text-[#6e6394]">FEATURED · 本周精选</span>
        <span className="text-[9.5px] text-[#8a8496]">运营置顶</span>
      </div>
      <h4 className="text-[20px] font-extrabold text-[#2e2a38] leading-snug mt-3 line-clamp-2">{a.title}</h4>
      <p className="text-[12px] text-[#6e6394] mt-1 font-mono">
        {a.timeFull.split(" ").slice(0, 2).join(" ")} · {a.place.split(" · ")[0]}
      </p>
      <div className="flex items-center gap-3 mt-4">
        <div className="flex-1">
          <div className="text-[10.5px] text-[#6e6394]">
            名额 {a.cap > 0 ? <b className="font-mono">{a.enrolled}/{a.cap}</b> : <b className="font-mono">{a.enrolled}</b>}
            <span className="ml-2">{a.free ? "免费 · 审核制" : `¥${a.price} · 凭证核验`}</span>
          </div>
          {a.cap > 0 && (
            <div className="h-[5px] rounded bg-white/70 overflow-hidden mt-[6px]">
              <div className="h-full rounded bg-[#6e6394]" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
        <span className="bg-[#2e2a38] text-white text-[12px] font-bold px-4 py-[8px] rounded-full">
          立即报名 →
        </span>
      </div>
    </button>
  );
}

export function SectionHeader({ title, hint, linkText, onLink }: { title: string; hint?: string; linkText?: string; onLink?: () => void }) {
  return (
    <div className="flex items-baseline mb-3">
      <h2 className="section-title">{title}</h2>
      {hint && <span className="text-[11px] text-[#b5b0bd] ml-2">{hint}</span>}
      {linkText && (
        <button onClick={onLink} className="ml-auto text-[12px] text-[#6e6394] font-semibold flex items-center gap-1">
          {linkText}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-50 bg-[#2e2a38]/90 text-white text-[13px] px-4 py-2 rounded-full max-w-[85vw] text-center">
      {message}
    </div>
  );
}
