"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Trophy, ChevronRight, Database, Zap, Eye } from "lucide-react";

const FEATURES = [
  { icon: Eye, text: "3단계 애니메이션으로 코드 실행 과정 시각화" },
  { icon: Database, text: "실제 포켓몬 데이터로 학습 (800개 데이터)" },
  { icon: Zap, text: "KeyError, IndexError 등 에러 원인 시각화" },
];

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* 포켓볼 히어로 섹션 */}
      <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(to bottom, #3A5C1A, #2D4A13)" }}>
        {/* 포켓볼 배경 장식 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="w-[500px] h-[500px] rounded-full border-[80px] border-white/5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10
                        w-8 h-8 rounded-full bg-white border-4 border-gray-700 shadow-xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 포켓볼 아이콘 */}
            <div className="inline-flex mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                <div className="w-full h-1/2" style={{ backgroundColor: "#FF0000" }} />
                <div className="relative w-full h-1/2 bg-white">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                  w-5 h-5 rounded-full bg-white border-4 border-gray-700" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
              Poké<span className="text-yellow-300">Pandas</span>
            </h1>
            <p className="text-white/80 text-lg mb-2">
              포켓몬 데이터로 배우는 Pandas 인덱싱 & 슬라이싱
            </p>
            <p className="text-white/60 text-sm">
              코드의 실행 과정을 단계별 애니메이션으로 눈으로 확인하세요!
            </p>
          </motion.div>

          {/* 특징 배지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm 
                           rounded-full px-4 py-2 text-white text-sm"
              >
                <f.icon className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                <span>{f.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 모드 선택 카드 */}
      <section className="flex-1 bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center text-2xl font-bold text-gray-800 mb-2"
          >
            학습 모드를 선택하세요
          </motion.h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            자유롭게 연습하거나, 미션을 클리어하며 실력을 키워보세요!
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* 자유 연습 모드 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link href="/practice">
                <div className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-50 
                               border-2 border-blue-200 hover:border-blue-400 
                               rounded-2xl p-7 cursor-pointer transition-all duration-300
                               hover:shadow-xl hover:shadow-blue-100">
                  {/* 포켓볼 장식 */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full 
                                  border-2 border-blue-200 overflow-hidden opacity-40">
                    <div className="w-full h-1/2 bg-blue-400" />
                    <div className="w-full h-1/2 bg-white" />
                  </div>

                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center 
                                  justify-center mb-5 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-7 h-7 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    자유 연습 모드
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    직접 CSV를 업로드하거나 샘플 데이터를 사용해서 
                    Pandas 코드를 자유롭게 실습해보세요.
                  </p>

                  <ul className="space-y-1.5 text-xs text-gray-500 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      CSV 파일 직접 업로드 가능 (최대 20행)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      df[], df.loc[], df.iloc[] 모두 지원
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      단계별 애니메이션으로 실행 과정 확인
                    </li>
                  </ul>

                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm
                                  group-hover:gap-3 transition-all">
                    시작하기
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 챌린지 미션 모드 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link href="/mission">
                <div className="relative h-full bg-gradient-to-br from-green-50 to-emerald-50 
                               border-2 border-green-200 hover:border-green-400 
                               rounded-2xl p-7 cursor-pointer transition-all duration-300
                               hover:shadow-xl hover:shadow-green-100">
                  {/* 포켓볼 장식 */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full 
                                  border-2 border-green-200 overflow-hidden opacity-40">
                    <div className="w-full h-1/2" style={{ backgroundColor: "#FF0000" }} />
                    <div className="w-full h-1/2 bg-white" />
                  </div>

                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center 
                                  justify-center mb-5 group-hover:bg-green-200 transition-colors">
                    <Trophy className="w-7 h-7" style={{ color: "#3A5C1A" }} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    챌린지 미션 모드
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    포켓몬 데이터를 사용한 단계별 미션을 클리어하며 
                    Pandas 실력을 체계적으로 쌓아보세요.
                  </p>

                  <ul className="space-y-1.5 text-xs text-gray-500 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      한 세션 8문제 (쉬움·보통·어려움 풀에서 랜덤 출제)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      포켓몬 50마리 랜덤 샘플 데이터 사용
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      정답 제출 시 즉각 피드백 제공
                    </li>
                  </ul>

                  <div className="flex items-center gap-2 font-semibold text-sm
                                  group-hover:gap-3 transition-all" style={{ color: "#3A5C1A" }}>
                    미션 시작
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* 학습 가이드 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200"
          >
            <h3 className="font-bold text-gray-700 mb-4 text-sm">📖 Pandas 코드 형식 예시</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { code: "df['열이름']", desc: "단일 열 선택" },
                { code: "df[['열1', '열2']]", desc: "다중 열 선택" },
                { code: "df[df['열'] == '값']", desc: "불리언 필터링" },
                { code: "df[df['열'] > 숫자]", desc: "숫자 조건 필터링" },
                { code: "df.loc[조건]", desc: "loc 라벨 기반 선택" },
                { code: "df.loc[조건, ['열1','열2']]", desc: "loc 행+열 동시 선택" },
                { code: "df.iloc[n:m]", desc: "iloc 행 범위 선택" },
                { code: "df[(조건1) & (조건2)]", desc: "복합 조건 (AND)" },
              ].map((item) => (
                <div key={item.code} className="flex items-center gap-2">
                  <code className="text-xs bg-white border border-gray-200 rounded px-2 py-1 
                                   text-green-700 font-mono flex-shrink-0">
                    {item.code}
                  </code>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
