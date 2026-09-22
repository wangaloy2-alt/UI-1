import { useNavigate } from "react-router";
import { Home, LayoutGrid, User } from "lucide-react";

export type TabKey = "home" | "square";

export default function TabBar({ tab, onChange }: { tab: TabKey; onChange: (t: TabKey) => void }) {
  const navigate = useNavigate();
  const switchTab = (key: TabKey) => {
    onChange(key);
    navigate(key === "home" ? "/" : "/square");
  };
  const items: { key: TabKey; label: string; icon: typeof Home }[] = [
    { key: "home", label: "首页", icon: Home },
    { key: "square", label: "活动广场", icon: LayoutGrid },
  ];
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-[#241f31]/95 backdrop-blur rounded-full px-6 py-[10px] flex items-center justify-between z-40 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
      {items.map(({ key, label, icon: Icon }) => {
        const active = tab === key;
        return (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`flex items-center gap-2 rounded-full px-4 py-[8px] transition ${
              active ? "bg-[#c9b8e8]" : ""
            }`}
          >
            <Icon size={18} strokeWidth={2} color={active ? "#241b3a" : "#8a8496"} />
            {active && <span className="text-[12px] font-bold text-[#241b3a]">{label}</span>}
          </button>
        );
      })}
      <button
        onClick={() => alert("「我的」页面：我的报名 / 画像完成度 / 参与历史（下一版）")}
        className="flex items-center gap-2 rounded-full px-4 py-[8px]"
      >
        <User size={18} strokeWidth={2} color="#8a8496" />
      </button>
    </div>
  );
}
