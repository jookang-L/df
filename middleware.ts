import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  STUDENT_SESSION_COOKIE,
} from "@/lib/auth/constants";
import {
  verifyAdminSessionToken,
  verifyStudentSessionToken,
} from "@/lib/auth/verify-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const studentToken = request.cookies.get(STUDENT_SESSION_COOKIE)?.value;
  const adminToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (pathname.startsWith("/admin")) {
    const adminSession = await verifyAdminSessionToken(adminToken);

    if (pathname === "/admin/login") {
      if (adminSession) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/mission")) {
    const studentSession = await verifyStudentSessionToken(studentToken);
    if (!studentSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mission/:path*", "/admin/:path*"],
};
