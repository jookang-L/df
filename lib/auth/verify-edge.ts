import { jwtVerify } from "jose";
import type { AdminSessionPayload, StudentSessionPayload } from "@/lib/auth/constants";

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

export async function verifyStudentSessionToken(
  token: string | undefined
): Promise<StudentSessionPayload | null> {
  if (!token) return null;
  const secret = getSessionSecret();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      studentId: payload.studentId as string,
      studentNumber: payload.studentNumber as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export async function verifyAdminSessionToken(
  token: string | undefined
): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    return {
      role: "admin",
      username: payload.username as string,
    };
  } catch {
    return null;
  }
}
