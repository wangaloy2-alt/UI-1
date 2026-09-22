import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  ArrowLeftRight,
  SlidersHorizontal,
  Presentation,
  GraduationCap,
  Users,
  FileText,
  LayoutGrid,
  Box,
  BadgeCheck,
  Award,
  ChevronRight,
  Ticket,
  MessagesSquare,
  Building2,
  Headset,
} from "lucide-react";
import { activities, newsFeed } from "@/data";
import type { Activity, NewsItem } from "@/data";
import { catCovers, FakeQR } from "@/components/Poster";
import ioneLogo from "@/assets/ione-logo.png";
import cover1 from "@/assets/covers/cover-1.png";
import cover2 from "@/assets/covers/cover-2.png";
import cover3 from "@/assets/covers/cover-3.png";

const catIcons = [
  { label: "路演", icon: Presentation },
  { label: "培训", icon: GraduationCap },
  { label: "沙龙", icon: Users },
  { label: "政策宣讲", icon: FileText },
  { label: "更多", icon: LayoutGrid },
];

const newsIcons: Record<NewsItem["icon"], typeof Box> = {
  cube: Box,
  check: BadgeCheck,
  award: Award,
};

const fnList = [
  { icon: Ticket, tint: "#efeaf6", title: "我的报名与电子票", desc: "报名 · 审核 · 签到码一站查看", badge: "2" },
  { icon: MessagesSquare, tint: "#e9f6f1", title: "活动群与通知", desc: "审核通过自动入群，24h/2h 自动提醒", badge: "" },
  { icon: Building2, tint: "#f3eee2", title: "企业服务台", desc: "场地 / 课程 / 政策申报预约", badge: "" },
  { icon: Headset, tint: "#efe9f6", title: "联系运营", desc: "入孵咨询与活动合作", badge: "" },
];

/** 电子票弹层：点开列表项后呈现票券（封面 + 信息格 + 撕线 + 二维码存根） */
function TicketSheet({ a, onClose }: { a: Activity; onClose: () => void }) {
  const cover = catCovers[a.cat];
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center px-8" onClick={onClose}>
      <div className="absolute inset-0 bg-[#14101d]/80 backdrop-blur-[2px]" />
      <div
        className="relative w-full max-w-[330px] bg-white rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 票头封面 */}
        <div className="relative h-[110px]">
          {cover && <img src={cover} alt={a.cat} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-b from-[#241b3a]/45 to-[#241b3a]/70" />
          <span className="absolute top-3 left-4 text-[9px] font-bold tracking-[2px] text-white/90 bg-white/15 border border-white/25 px-1.5 py-[2px] rounded-md">
            我的电子票 · 共 2 张
          </span>
          <span className="absolute bottom-3 left-4 right-4 text-[15px] font-extrabold text-white leading-snug line-clamp-1">
            {a.title}
          </span>
        </div>

        {/* 信息格 */}
        <div className="px-5 pt-4 pb-3 grid grid-cols-3 gap-3">
          <div>
            <div className="text-[9px] text-[#b5b0bd] tracking-wide">时间</div>
            <div className="text-[12px] font-bold text-[#241b3a] mt-[2px]">{a.date} {a.weekday}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#b5b0bd] tracking-wide">地点</div>
            <div className="text-[12px] font-bold text-[#241b3a] mt-[2px] truncate">{a.place.split(" · ")[0]}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#b5b0bd] tracking-wide">状态</div>
            <div className="text-[12px] font-bold text-[#3a8a58] mt-[2px]">审核通过</div>
          </div>
        </div>

        {/* 撕线（两侧半圆缺口，透出遮罩底色） */}
        <div className="relative px-5">
          <div className="border-t-2 border-dashed border-[#e8e4f0]" />
          <span className="absolute -left-[11px] -top-[11px] w-[22px] h-[22px] rounded-full bg-[#1d1829]" />
          <span className="absolute -right-[11px] -top-[11px] w-[22px] h-[22px] rounded-full bg-[#1d1829]" />
        </div>

        {/* 二维码存根 */}
        <div className="px-5 pt-4 pb-5 flex flex-col items-center gap-2">
          <div className="bg-white border border-[#ece8f3] rounded-[16px] p-3 shadow-[0_6px_18px_rgba(36,27,58,0.10)]">
            <FakeQR seed={a.id * 31 + 7} size={132} />
          </div>
          <span className="text-[10px] font-mono text-[#8a8496] tracking-[1px]">NO.2026{a.date.replace(".", "")}-{String(8600 + a.id * 37).slice(1)}</span>
          <span className="text-[9.5px] text-[#b5b0bd]">现场出示此码签到 · 截图无效</span>
        </div>
      </div>
    </div>
  );
}

/** 活动倒计时提醒 banner（点开直达电子票） */
function CountdownBanner({ a, onOpen }: { a: Activity; onOpen: () => void }) {
  const target = new Date(2026, 8, Number(a.date.slice(3, 5)), 9, 30).getTime();
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const cells = left <= 0 ? [["--", "活动进行中"]] : d > 0 ? [[d, "天"], [h, "小时"], [m, "分"]] : [[h, "小时"], [m, "分"], [Math.floor(left / 1000) % 60, "秒"]];
  return (
    <div className="mx-4 mt-4">
      <button
        onClick={onOpen}
        className="w-full block text-left rounded-[24px] p-4 bg-gradient-to-br from-[#6e6394] to-[#4e4470] shadow-[0_14px_36px_rgba(0,0,0,0.28)] relative overflow-hidden active:scale-[0.99] transition"
      >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[2px] text-white/70">下一场活动 · 倒计时</span>
        <span className="text-[10px] text-white/60">{a.cat} · 电子票 ›</span>
      </div>
      <div className="mt-1 text-[14px] font-extrabold text-white leading-snug line-clamp-1">{a.title}</div>
      <div className="mt-3 flex items-end gap-3">
        {cells.map(([v, u]) => (
          <div key={u as string} className="flex items-baseline gap-1">
            <span className="text-[26px] font-extrabold text-white font-mono leading-none">{v}</span>
            <span className="text-[10px] text-white/70">{u}</span>
          </div>
        ))}
        <span className="ml-auto text-[10px] text-white/70 pb-[2px]">{a.date} {a.weekday} 开始</span>
      </div>
      </button>
    </div>
  );
}

function DateCard({ a }: { a: Activity }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/detail/${a.id}`)}
      className="bg-[#f6f4fa] rounded-[20px] p-4 w-[136px] shrink-0 flex flex-col items-start gap-1 text-left active:scale-[0.98] transition"
    >
      <div className="text-[20px] font-extrabold text-[#241b3a] leading-none font-mono">
        {a.date.slice(0, 2)}
        <span className="text-[14px]">{a.date.slice(2)}</span>
      </div>
      <div className="text-[10px] text-[#8a8496]">{a.weekday}</div>
      <div className="text-[13px] font-bold leading-snug line-clamp-3 text-[#241b3a] mt-1">{a.title}</div>
    </button>
  );
}

export default function Home({ onToast }: { onToast: (msg: string) => void }) {
  const navigate = useNavigate();
  const days = activities.filter((a) => a.week);
  const [ticket, setTicket] = useState<Activity | null>(null);

  return (
    <div className="pb-32">
      {ticket && <TicketSheet a={ticket} onClose={() => setTicket(null)} />}
      {/* 顶部固定区：ioNE logo + 搜索 */}
      <div className="sticky top-0 z-50 px-4 pt-3">
        <div className="bg-white rounded-[28px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between">
            <img src={ioneLogo} alt="ioNE" className="h-[30px] w-auto" />
            <button
              onClick={() => onToast("多园区场景：切换孵化器（demo 数据为单个孵化器）")}
              className="w-[36px] h-[36px] rounded-full bg-[#f0edf8] flex items-center justify-center"
            >
              <ArrowLeftRight size={16} color="#6e6394" />
            </button>
          </div>
          <button
            onClick={() => navigate("/square")}
            className="mt-3 w-full flex items-center gap-2 bg-[#f6f4fa] rounded-full px-4 py-[11px] text-left"
          >
            <Search size={16} color="#8a8496" />
            <span className="flex-1 text-[13px] text-[#b5b0bd]">搜索活动、项目、园区</span>
            <SlidersHorizontal size={15} color="#6e6394" />
          </button>
        </div>
      </div>

      {/* 入口 tiles（封面图来自品牌视觉稿） */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-4">
        <button
          onClick={() => navigate("/companies")}
          className="relative overflow-hidden rounded-[24px] h-[108px] text-left active:scale-[0.97] transition"
        >
          <img src={cover1} alt="孵化生态" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#241b3a]/55 backdrop-blur-sm text-[12px] font-extrabold text-white">孵化生态</span>
        </button>
        <button
          onClick={() => navigate("/square")}
          className="relative overflow-hidden rounded-[24px] h-[108px] text-left active:scale-[0.97] transition"
        >
          <img src={cover2} alt="活动广场" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#241b3a]/55 backdrop-blur-sm text-[12px] font-extrabold text-white">活动广场</span>
        </button>
        <button
          onClick={() => onToast("滑卡发现模式（4.4.5）：滑动卡片表达兴趣，生成专属推荐组合（下一版）")}
          className="relative overflow-hidden rounded-[24px] h-[108px] text-left active:scale-[0.97] transition"
        >
          <img src={cover3} alt="为你推荐" className="absolute inset-0 w-full h-full object-cover object-bottom" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#241b3a]/55 backdrop-blur-sm text-[12px] font-extrabold text-white">为你推荐</span>
        </button>
      </div>

      {/* 活动倒计时提醒 banner（点开直达电子票） */}
      <CountdownBanner a={activities[3]} onOpen={() => setTicket(activities[3])} />

      {/* 金刚区（分类导航） */}
      <div className="bg-white rounded-[28px] mx-4 mt-4 px-6 py-5">
        <div className="flex justify-between">
          {catIcons.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() =>
                label === "更多" ? navigate("/square") : navigate(`/square?cat=${encodeURIComponent(label)}`)
              }
              className="flex flex-col items-center gap-2"
            >
              <span className="w-[46px] h-[46px] rounded-2xl bg-[#f0edf8] flex items-center justify-center">
                <Icon size={20} strokeWidth={1.7} color="#6e6394" />
              </span>
              <span className="text-[11px] text-[#5e5478]">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 本周活动 */}
      <div className="bg-white rounded-[28px] mx-4 mt-4 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-extrabold text-[#241b3a]">本周活动</h2>
          <button onClick={() => navigate("/square")} className="text-[12px] text-[#6e6394] font-semibold flex items-center gap-1">
            查看全部
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
          {days.map((a) => (
            <DateCard key={a.id} a={a} />
          ))}
        </div>
      </div>

      {/* 生态动态 */}
      <div className="bg-white rounded-[28px] mx-4 mt-4 p-4">
        <h2 className="text-[17px] font-extrabold text-[#241b3a] mb-2">生态动态</h2>
        <div>
          {newsFeed.map((n) => {
            const Icon = newsIcons[n.icon];
            return (
              <div key={n.id} className="flex items-center gap-3 py-[10px] border-t border-[#f4f1f8] first:border-0 first:pt-1 last:pb-1">
                <span className="w-[34px] h-[34px] rounded-full bg-[#f0edf8] flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={1.8} color="#6e6394" />
                </span>
                <span className="flex-1 text-[13px] text-[#2e2a38] truncate">{n.text}</span>
                <span className="text-[11px] text-[#b5b0bd] shrink-0">{n.time}</span>
                <ChevronRight size={14} color="#d5d0dd" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 常用功能 */}
      <div className="bg-white rounded-[28px] mx-4 mt-4 p-4">
        <h2 className="text-[17px] font-extrabold text-[#241b3a] mb-1">常用功能</h2>
        <div>
          {fnList.map((f, i) => (
            <button
              key={f.title}
              onClick={() =>
                i === 0
                  ? setTicket(activities[0])
                  : onToast(
                      [
                        "",
                        "活动群与通知（下一版）",
                        "企业服务台：场地 / 课程 / 政策申报（下一版）",
                        "已呼叫运营 · 工作时间 10 分钟内响应（演示）",
                      ][i]
                    )
              }
              className="w-full flex items-center gap-3 py-[12px] border-t border-[#f4f1f8] first:border-0 text-left active:opacity-70 transition"
            >
              <span className="w-[36px] h-[36px] rounded-[12px] flex items-center justify-center shrink-0" style={{ background: f.tint }}>
                <f.icon size={17} strokeWidth={1.8} color="#6e6394" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center text-[14px] font-semibold text-[#241b3a]">
                  {f.title}
                  {f.badge && (
                    <span className="ml-2 bg-[#fa5151] text-white text-[9px] font-bold rounded-lg px-[6px] py-[1px]">
                      {f.badge}
                    </span>
                  )}
                </span>
                <span className="block text-[11px] text-[#b5b0bd] mt-[2px]">{f.desc}</span>
              </span>
              <ChevronRight size={15} color="#c9c2dc" />
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-[10.5px] text-[#6f6890] mt-5">
        本月 <b className="text-[#a89cc4]">9</b> 场活动 · <b className="text-[#a89cc4]">412</b> 人次参与
      </p>
    </div>
  );
}
