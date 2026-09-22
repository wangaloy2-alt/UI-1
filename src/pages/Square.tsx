import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, CalendarDays, MapPin } from "lucide-react";
import { activities, categories } from "@/data";
import type { Activity } from "@/data";
import { Badge, FeaturedBanner, Price } from "@/components/widgets";
import { Poster } from "@/components/Poster";

const catChips = categories;
const timeChips = ["全部时间", "本周"];
const priceChips = ["不限价格", "免费", "收费"];

function Card({ a, onOpen }: { a: Activity; onOpen: () => void }) {
  const disabled = a.pre !== undefined || a.full !== undefined || a.closed !== undefined;
  return (
    <button onClick={onOpen} className="card-soft w-full text-left overflow-hidden flex flex-col active:scale-[0.99] transition">
      {/* 顶部海报条 */}
      <div className="relative h-[92px]">
        <Poster a={a} variant="strip" />
      </div>
      <div className="p-4 pt-3 flex flex-col">
        <div className="flex items-center gap-2">
          <h4 className="flex-1 text-[15px] font-extrabold leading-snug line-clamp-1 text-[#241b3a]">{a.title}</h4>
          <Badge a={a} />
        </div>
        <div className="mt-1 text-[11px] text-[#8a8496] flex items-center gap-3">
          <span>🗓 {a.timeFull.split(" ").slice(0, 2).join(" ")}</span>
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {a.place.split(" · ")[0]}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#f4f1f8] flex items-center gap-2">
          <Price a={a} />
          {a.hot ? (
            <span className="text-[10px] text-[#8a8496]">
              <b className="text-[#e0684b]">🔥</b> {a.enrolled}人
            </span>
          ) : a.enrolled > 0 ? (
            <span className="text-[10px] text-[#8a8496]">
              已报{a.enrolled}
              {a.cap ? `/${a.cap}` : ""}
            </span>
          ) : null}
          <span className="ml-auto">
            {disabled ? (
              <span className="text-[11px] text-[#b5b0bd]">
                {a.pre ? "待开启" : a.full ? "可候补" : "已截止"}
              </span>
            ) : (
              <span className="text-[12px] font-bold text-white bg-[#241b3a] px-4 py-[7px] rounded-full">
                报名
              </span>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Square({ onToast }: { onToast: (msg: string) => void }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initCat = params.get("cat");
  const [kw, setKw] = useState("");
  const [cat, setCat] = useState(initCat && categories.includes(initCat) ? initCat : "全部");
  const [time, setTime] = useState("全部时间");
  const [price, setPrice] = useState("不限价格");

  const list = useMemo(() => {
    const k = kw.trim();
    return activities.filter((a) => {
      if (cat !== "全部" && a.cat !== cat) return false;
      if (time === "本周" && !a.week) return false;
      if (price === "免费" && !a.free) return false;
      if (price === "收费" && a.free) return false;
      if (k && !a.title.includes(k) && !a.intro.includes(k)) return false;
      return true;
    });
  }, [kw, cat, time, price]);

  const featured = list.find((a) => a.featured);
  const rest = list.filter((a) => a !== featured);

  const clearFilters = () => {
    setCat("全部");
    setTime("全部时间");
    setPrice("不限价格");
    setKw("");
  };

  return (
    <div className="pb-28">
      {/* 搜索栏 + 日历 */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-[14px] px-3 py-[9px] border border-[#ece7f0]">
          <Search size={15} color="#8a8496" />
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="搜索活动标题 / 关键词"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[#b5b0bd]"
          />
        </div>
        <button
          onClick={() => onToast("日历视图：按日期浏览活动（下一版）")}
          className="w-[40px] bg-white rounded-[14px] border border-[#ece7f0] flex items-center justify-center"
        >
          <CalendarDays size={16} color="#6e6394" />
        </button>
      </div>

      {/* 筛选 chips：分类 */}
      <div className="flex gap-2 overflow-x-auto px-5 py-2">
        {catChips.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 text-[12px] px-[13px] py-[5px] rounded-full border transition ${
              cat === c ? "bg-[#241b3a] border-[#241b3a] text-white font-semibold" : "bg-white border-[#ece7f0] text-[#8a8496]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 筛选 chips：时间 / 价格 */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2">
        {timeChips.map((c) => (
          <button
            key={c}
            onClick={() => setTime(c)}
            className={`shrink-0 text-[12px] px-[13px] py-[5px] rounded-full border transition ${
              time === c ? "bg-[#241b3a] border-[#241b3a] text-white font-semibold" : "bg-white border-[#ece7f0] text-[#8a8496]"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="w-px bg-[#ece7f0] my-1 mx-1" />
        {priceChips.map((c) => (
          <button
            key={c}
            onClick={() => setPrice(c)}
            className={`shrink-0 text-[12px] px-[13px] py-[5px] rounded-full border transition ${
              price === c ? "bg-[#241b3a] border-[#241b3a] text-white font-semibold" : "bg-white border-[#ece7f0] text-[#8a8496]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 本周精选（莫兰迪色块大卡，标签内置） */}
      {featured && (
        <div className="px-5 mt-1">
          <FeaturedBanner a={featured} onClick={() => navigate(`/detail/${featured.id}`)} />
        </div>
      )}

      {/* 列表 */}
      <div className="px-5 mt-5">
        <div className="flex items-baseline mb-3">
          <h2 className="text-[17px] font-extrabold text-[#241b3a]">{cat === "全部" ? "全部活动" : cat}</h2>
          <span className="text-[11px] text-[#b5b0bd] ml-2">
            {list.length} 场{kw.trim() ? ` · 关键词「${kw.trim()}」` : ""}
          </span>
        </div>
        {rest.length === 0 ? (
          <div className="rounded-[24px] bg-[#efeaf6] py-14 text-center">
            <div className="text-[34px] opacity-40">🍃</div>
            <p className="text-[13px] text-[#8a8496] mt-2">没有符合条件的活动</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-[12px] px-4 py-[6px] rounded-full bg-white border border-[#e2d9ef] text-[#6e6394] font-medium"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rest.map((a) => (
              <Card key={a.id} a={a} onOpen={() => navigate(`/detail/${a.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
