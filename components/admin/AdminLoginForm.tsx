"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { loginAdmin, type AdminAuthState } from "@/app/actions/admin-auth";

const initialState: AdminAuthState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      action={formAction}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 w-full max-w-md"
    >
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 mb-3">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">관리자 로그인</h1>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
        className="w-full py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition-colors disabled:opacity-60"
      >
        {pending ? "로그인 중…" : "관리자 로그인"}
      </button>
    </motion.form>
  );
}
