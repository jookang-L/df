"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  deleteAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/admin-session";

export interface AdminAuthState {
  error?: string;
}

export async function loginAdmin(
  _prev: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(username, password)) {
    return { error: "관리자 아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await deleteAdminSession();
  redirect("/admin/login");
}
