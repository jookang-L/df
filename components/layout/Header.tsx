"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Zap, LogOut, User } from "lucide-react";
import { logoutStudent } from "@/app/actions/auth";
import type { StudentSessionPayload } from "@/lib/auth/constants";

const THEME_GREEN = "#3A5C1A";
const POKEBALL_RED = "#FF0000";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/practice", label: "Practice" },
  { href: "/mission", label: "Mission" },
  { href: "/score", label: "Score" },
];

interface HeaderProps {
  student: StudentSessionPayload | null;
}

export default function Header({ student }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full shadow-lg" style={{ backgroundColor: THEME_GREEN }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          {!isHome && (
            <ChevronLeft className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
          )}
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
            <div className="w-full h-1/2" style={{ backgroundColor: POKEBALL_RED }} />
            <div className="relative w-full h-1/2 bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-gray-700" />
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight hidden sm:inline">
            PokéPandas
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? "bg-white text-green-800"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {student ? (
            <>
              <div className="hidden sm:flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 max-w-[180px]">
                <User className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                <span className="text-white text-xs font-medium truncate">
                  {student.name} ({student.studentNumber})
                </span>
              </div>
              <form action={logoutStudent}>
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-white text-xs font-semibold transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">로그아웃</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="text-white/90 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/15 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="bg-white text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-yellow-100 transition-colors"
              >
                회원가입
              </Link>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
            <Zap className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
            <span className="text-white text-xs font-semibold">made by Jook</span>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/20 px-4 py-2 flex gap-1 overflow-x-auto">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                active ? "bg-white text-green-800" : "text-white/85 bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="h-0.5 bg-white/30 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
      </div>
    </header>
  );
}
