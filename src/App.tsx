import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Square from "./pages/Square";
import Companies from "./pages/Companies";
import Detail from "./pages/Detail";
import TabBar from "@/components/TabBar";
import type { TabKey } from "@/components/TabBar";
import { Toast } from "@/components/widgets";

function Shell() {
  const location = useLocation();
  const [tab, setTab] = useState<TabKey>("home");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setTab(location.pathname.startsWith("/square") ? "square" : "home");
  }, [location.pathname]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const showTabBar = location.pathname === "/" || location.pathname.startsWith("/square");
  const bg = location.pathname === "/" ? "#1c1826" : "#faf8f4";

  return (
    <div className="h-full flex justify-center">
      {/* 手机外框：桌面居中，移动端全屏；首页深色底，其余奶油底 */}
      <div className="relative w-full max-w-[430px] h-full overflow-hidden shadow-2xl" style={{ background: bg }}>
        <div className="h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home onToast={setToast} />} />
            <Route path="/square" element={<Square onToast={setToast} />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/detail/:id" element={<Detail onToast={setToast} />} />
          </Routes>
        </div>
        {showTabBar && <TabBar tab={tab} onChange={setTab} />}
        <Toast message={toast} />
      </div>
    </div>
  );
}

export default function App() {
  return <Shell />;
}
