"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* 미니 포켓볼 */}
          <div className="w-5 h-5 rounded-full border border-gray-600 overflow-hidden flex-shrink-0">
            <div className="w-full h-1/2 bg-red-700" />
            <div className="w-full h-1/2 bg-white/20" />
          </div>
          <span className="text-xs">PokéPandas &mdash; Pandas 데이터 추출 시각화 학습 도구</span>
        </div>
        <p className="text-xs opacity-60">
          고등학생을 위한 데이터 과학 교육 프로젝트
        </p>
      </div>
    </footer>
  );
}
