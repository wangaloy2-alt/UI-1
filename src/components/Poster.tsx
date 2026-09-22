import { useEffect, useRef } from "react";
import type { Activity } from "@/data";
import coverSalon from "@/assets/covers/cat-salon.png";
import coverPitch from "@/assets/covers/cat-pitch.png";
import coverJob from "@/assets/covers/cat-job.png";
import coverTrain from "@/assets/covers/cat-train.png";
import coverPolicy from "@/assets/covers/cat-policy.png";
import coverCommunity from "@/assets/covers/cat-community.png";

/** 分类 → 系统生成封面（ioNE 靶心元素 · 半调像素风） */
export const catCovers: Record<string, string> = {
  沙龙: coverSalon,
  路演: coverPitch,
  招聘: coverJob,
  培训: coverTrain,
  政策宣讲: coverPolicy,
  社群活动: coverCommunity,
};

/** 确定性伪二维码（demo 用，按 id 生成稳定图案） */
export function FakeQR({ seed, size = 56 }: { seed: number; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const n = 21;
    const m = Math.floor(cv.width / n);
    const ctx = cv.getContext("2d")!;
    let s = (seed * 2654435761) >>> 0 || 88;
    const rnd = () => {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#241b3a";
    const eye = (x: number, y: number) => {
      ctx.fillStyle = "#241b3a";
      ctx.fillRect(x * m, y * m, 7 * m, 7 * m);
      ctx.fillStyle = "#fff";
      ctx.fillRect((x + 1) * m, (y + 1) * m, 5 * m, 5 * m);
      ctx.fillStyle = "#241b3a";
      ctx.fillRect((x + 2) * m, (y + 2) * m, 3 * m, 3 * m);
    };
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const ie = (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
        if (!ie && rnd() > 0.52) {
          ctx.fillStyle = "#241b3a";
          ctx.fillRect(x * m, y * m, m, m);
        }
      }
    eye(0, 0); eye(n - 7, 0); eye(0, n - 7);
  }, [seed]);
  return <canvas ref={ref} width={size} height={size} style={{ width: "100%", height: "100%" }} />;
}

/** 像素风马赛克装饰：确定性随机白色像素块（cover 任意区域） */
export function PixelDecor({ seed, tone = "#ffffff" }: { seed: number; tone?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const cols = 12;
    const rows = 7;
    const cell = 16;
    cv.width = cols * cell;
    cv.height = rows * cell;
    const ctx = cv.getContext("2d")!;
    ctx.clearRect(0, 0, cv.width, cv.height);
    let s = (seed * 2246822519) >>> 0 || 42;
    const rnd = () => {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = rnd();
        if (r > 0.62) {
          const alpha = 0.08 + rnd() * 0.22;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = tone;
          // 偶尔画 2x2 大块，增强像素感
          if (r > 0.93 && x < cols - 1 && y < rows - 1) {
            ctx.fillRect(x * cell, y * cell, cell * 2, cell * 2);
            x++;
          } else {
            ctx.fillRect(x * cell, y * cell, cell, cell);
          }
          ctx.globalAlpha = 1;
        }
      }
    }
  }, [seed, tone]);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated", objectFit: "cover" }}
    />
  );
}

/**
 * 系统生成海报封面（莫兰迪柔和版）
 * variant="thumb"：左侧竖封面（详情页头图等）
 * variant="strip"：卡片顶部横条（高度 ~92px，信息精简）
 */
export function Poster({ a, qrSize = 30, variant = "thumb" }: { a: Activity; qrSize?: number; variant?: "thumb" | "strip" }) {
  const strip = variant === "strip";
  const cover = catCovers[a.cat];
  return (
    <div className="absolute inset-0 bg-[#8d81ad]">
      {/* 分类封面图 */}
      {cover && <img src={cover} alt={a.cat} className="absolute inset-0 w-full h-full object-cover" />}
      {/* 文字压暗渐变，保证白色文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#241b3a]/55 via-transparent to-[#241b3a]/60" />
      {!strip && (
        <div className="absolute left-2 top-2 text-[8px] font-bold text-white/95 bg-white/15 border border-white/30 px-1.5 py-[2px] rounded-md tracking-wide">
          {a.free ? "免费" : "收费"} · {a.cat}
        </div>
      )}
      <div
        className={`absolute left-3 right-3 font-bold text-white leading-snug ${
          strip ? "top-4 text-[14px] line-clamp-1" : "top-7 text-[11px] line-clamp-3"
        }`}
      >
        {a.title}
      </div>
      <div
        className={`absolute left-3 text-white/80 font-mono ${strip ? "bottom-3 text-[10px]" : "bottom-7 text-[8px] leading-relaxed"}`}
      >
        {a.date} {a.weekday}
        {!strip && (
          <>
            <br />
            {a.place.split(" · ")[0]}
          </>
        )}
      </div>
      {!strip && (
        <div className="absolute right-2 bottom-2 bg-white rounded p-[3px]" style={{ width: qrSize + 6, height: qrSize + 6 }}>
          <FakeQR seed={a.id * 31 + 7} size={60} />
        </div>
      )}
    </div>
  );
}
