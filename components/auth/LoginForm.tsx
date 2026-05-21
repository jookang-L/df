"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { loginStudent, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = "/mission" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginStudent, initialState);

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      action={formAction}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 w-full max-w-md"
    >
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
          <LogIn className="w-6 h-6 text-green-700" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">로그인</h1>
        <p className="text-sm text-gray-500 mt-1">학번과 비밀번호로 로그인하세요</p>
      </div>

      <input type="hidden" name="redirect" value={redirectTo} />

      <div>
        <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-700 mb-1">
          학번
        </label>
        <input
          id="studentNumber"
          name="studentNumber"
          type="text"
          required
          autoComplete="username"
          placeholder="예: 20241234"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors disabled:opacity-60"
      >
        {pending ? "로그인 중…" : "로그인"}
      </button>

      <p className="text-center text-sm text-gray-500">
        계정이 없나요?{" "}
        <Link href="/register" className="text-green-700 font-medium hover:underline">
          회원가입
        </Link>
      </p>
    </motion.form>
  );
}
