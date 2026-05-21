"use client";

import { ReactNode } from "react";

interface PokeContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PokeContainer({ children, className = "" }: PokeContainerProps) {
  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`}>
      {/* 포켓볼 상단 레드 영역 */}
      <div className="bg-red-600 w-full" style={{ height: "8px" }} />

      {/* 포켓볼 구분선 + 중앙 원 */}
      <div className="relative bg-gray-100 w-full" style={{ height: "4px" }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                     w-6 h-6 rounded-full bg-white border-4 border-gray-700 shadow-lg"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 pt-10">
        {children}
      </main>
    </div>
  );
}
