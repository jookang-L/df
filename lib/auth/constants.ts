export const STUDENT_SESSION_COOKIE = "pokepandas_session";
export const ADMIN_SESSION_COOKIE = "pokepandas_admin_session";

export interface StudentSessionPayload {
  studentId: string;
  studentNumber: string;
  name: string;
}

export interface AdminSessionPayload {
  role: "admin";
  username: string;
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET must be set (min 16 characters)");
  }
  return new TextEncoder().encode(secret);
}

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET or SESSION_SECRET must be set (min 16 characters)");
  }
  return new TextEncoder().encode(secret);
}
