import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/onboarding"];
const authRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname.startsWith("/dashboard") && token) {
        const hasPreferences = req.cookies.get("hasPreferences")?.value;
        if (hasPreferences !== "true") {
            return NextResponse.redirect(new URL("/onboarding", req.url));
        }
    }

    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/login", "/signup"],
};
