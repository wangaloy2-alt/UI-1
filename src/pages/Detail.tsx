import { useNavigate, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { activities } from "@/data";
import { Price } from "@/components/widgets";
import { Poster } from "@/components/Poster";

export default function Detail({ onToast }: { onToast: (msg: string) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const a = activities.find((x) => x.id === Number(id));

  if (!a)
    return (
      <div className="p-8 text-center text-[13px] text-[#8a8496]">
        活动不存在
        <button className="block mx-auto mt-3 text-[#6e6394]" onClick={() => navigate("/square")}>
          返回活动广场
        </button>
      </div>
    );

  const pct = a.cap ? Math.min(100, Math.round((a.enrolled / a.cap) * 100)) : 0;

  const btn = a.pre ? (
    <div className="flex-1 text-center text-[15px] font-bold py-[11px] rounded-[14px] bg-[#e2d9ef] text-[#8a8496]">
      未开始报名 · {a.pre}
    </div>
  ) : a.full ? (
    <button
      onClick={() => onToast("已进入候补队列，有名额释放将第一时间通知你")}
      className="flex-1 text-center text-[15px] font-bold py-[11px] rounded-[14px] bg-[#c0762a] text-white"
    >
      已满 · 加入候补
    </button>
  ) : a.closed ? (
    <div className="flex-1 text-center text-[15px] font-bold py-[11px] rounded-[14px] bg-[#e2d9ef] text-[#8a8496]">
      报名已截止
    </div>
  ) : (
    <button
      onClick={() =>
        onToast(
          a.free
            ? "已提交报名（审核制）· 审核通过后自动通知 + 活动群二维码"
            : "已提交报名 · 请按提示转账并在 24h 内上传凭证"
        )
      }
      className="flex-1 text-center text-[15px] font-bold py-[11px] rounded-[14px] bg-[#6e6394] text-white active:scale-[0.99] transition"
    >
      立即报名
    </button>
  );

  return (
    <div className="pb-28">
      {/* 头图海报 */}
      <div className="relative h-[210px]">
        <Poster a={a} qrSize={40} />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 w-[34px] h-[34px] rounded-full bg-white/90 shadow flex items-center justify-center z-10"
        >
          <ChevronLeft size={18} color="#4e4470" />
        </button>
      </div>

      <div className="relative bg-white rounded-t-[24px] -mt-5 px-5 pt-5 pb-8">
        <h1 className="text-[19px] font-bold leading-snug">{a.title}</h1>
        <div className="mt-2 text-[11.5px] text-[#8a8496] flex gap-3">
          <span>浏览 {1200 + a.enrolled * 17}</span>
          <span>
            报名 {a.enrolled}
            {a.cap ? `/${a.cap}` : ""}
          </span>
          <span>{a.cat}</span>
        </div>

        {/* 关键信息 */}
        <div className="mt-4 border border-[#ece7f0] rounded-[14px] overflow-hidden text-[13px]">
          <div className="flex gap-3 px-3 py-[10px]">
            <span className="text-[#8a8496] w-[34px] shrink-0">时间</span>
            <span className="font-bold">{a.timeFull}</span>
          </div>
          <div className="flex gap-3 px-3 py-[10px] border-t border-[#f2eff6]">
            <span className="text-[#8a8496] w-[34px] shrink-0">地点</span>
            <span>{a.place}</span>
          </div>
          <div className="flex gap-3 px-3 py-[10px] border-t border-[#f2eff6]">
            <span className="text-[#8a8496] w-[34px] shrink-0">方式</span>
            <span>
              审核制 · {a.free ? "免费活动" : `收费 ¥${a.price}（转账凭证核验）`}
              {a.wait ? " · 支持候补" : ""}
            </span>
          </div>
        </div>

        {/* 名额进度 */}
        {a.cap > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-[#8a8496] mb-1">
              <span>名额进度</span>
              <span className="font-mono">
                {a.enrolled} / {a.cap}
              </span>
            </div>
            <div className="h-[6px] rounded bg-[#efedf5] overflow-hidden">
              <div
                className="h-full rounded bg-gradient-to-r from-[#6e6394] to-[#a08fc4]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* 简介 */}
        <div className="mt-6">
          <h3 className="section-title">活动简介</h3>
          <p className="mt-2 text-[13px] leading-[1.85] text-[#443b60]">{a.intro}</p>
        </div>

        {/* 议程 */}
        {a.agenda && (
          <div className="mt-6">
            <h3 className="section-title">议程安排</h3>
            <p className="mt-2 text-[13px] leading-[1.85] text-[#443b60] whitespace-pre-line">{a.agenda}</p>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#ece7f0] px-4 pt-3 pb-6 flex items-center gap-3 z-40">
        <Price a={a} size="lg" />
        {btn}
      </div>
    </div>
  );
}
