"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Zap } from "lucide-react";

const THEME_GREEN = "#3A5C1A";
/** 포켓볼 상단 (클래식 몬스터볼) */
const POKEBALL_RED = "#FF0000";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full shadow-lg" style={{ backgroundColor: THEME_GREEN }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 group">
          {!isHome && (
            <ChevronLeft className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
          )}
          {/* 포켓볼 아이콘 */}
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
            <div className="w-full h-1/2" style={{ backgroundColor: POKEBALL_RED }} />
            <div className="relative w-full h-1/2 bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-gray-700" />
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            PokéPandas
          </span>
        </Link>

        {/* 중앙 타이틀 */}
        <div className="hidden sm:block text-center">
          <p className="text-white/80 text-xs font-medium tracking-widest uppercase">
            Pandas 시각화 학습 도구
          </p>
        </div>

        {/* 우측 배지 */}
        <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
          <Zap className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
          <span className="text-white text-xs font-semibold">made by Jook</span>
        </div>
      </div>

      {/* 포켓볼 중앙 라인 */}
      <div className="h-0.5 bg-white/30 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
      </div>
    </header>
  );
}
