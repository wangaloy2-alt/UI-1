import { useNavigate } from "react-router";
import { ChevronLeft, Building2, Handshake } from "lucide-react";
import { companies } from "@/data";

export default function Companies() {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      {/* 顶栏 */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="w-[34px] h-[34px] rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <ChevronLeft size={18} color="#4e4470" />
        </button>
        <h1 className="text-[17px] font-bold">孵化生态 · 在孵企业一览</h1>
      </div>

      <p className="px-5 text-[12px] text-[#8a8496] mb-4">
        项目信息全公开，合作意向由运营撮合对接（联系方式不公开）
      </p>

      {/* 企业卡片 */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {companies.map((c) => (
          <div key={c.id} className="card-soft p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-[34px] h-[34px] rounded-[12px] bg-[#efeaf6] flex items-center justify-center">
                <Building2 size={16} strokeWidth={1.8} color="#6e6394" />
              </span>
              <span className="text-[14px] font-semibold truncate">{c.name}</span>
            </div>
            <p className="text-[12px] text-[#8a8496] leading-snug">{c.intro}</p>
            <div className="flex gap-1.5">
              <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#efeaf6] text-[#6e6394]">{c.industry}</span>
              <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#f5f3f7] text-[#8a8496]">{c.stage}</span>
            </div>
            <button
              onClick={() => alert(`已提交与「${c.name}」的对接意向（${c.need}），运营将尽快撮合`)}
              className="mt-1 flex items-center justify-center gap-1 text-[11px] font-medium text-[#6e6394] border border-[#e2d9ef] rounded-full py-[5px] active:scale-95 transition"
            >
              <Handshake size={12} />
              对接意向
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
