"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { registerStudent, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerStudent, initialState);

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      action={formAction}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 w-full max-w-md"
    >
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
          <UserPlus className="w-6 h-6 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">회원가입</h1>
        <p className="text-sm text-gray-500 mt-1">학번, 이름, 비밀번호로 가입하세요</p>
      </div>

      <div>
        <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-700 mb-1">
          학번
        </label>
        <input
          id="studentNumber"
          name="studentNumber"
          type="text"
          required
          placeholder="예: 20241234"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="예: 김민수"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
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
          minLength={4}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
        />
      </div>

      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
          minLength={4}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
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
        className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors disabled:opacity-60"
      >
        {pending ? "가입 중…" : "회원가입"}
      </button>

      <p className="text-center text-sm text-gray-500">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="text-green-700 font-medium hover:underline">
          로그인
        </Link>
      </p>
    </motion.form>
  );
}
