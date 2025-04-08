import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }
  try {
    const secretKey = new TextEncoder().encode("my-movie-review-app-book");
    const decodedJwt = await jwtVerify(token, secretKey);
    console.log("decodedJwt:", decodedJwt);
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "トークンが正しくないので、ログインしてください",
    });
  }
}

export const config = {
  matcher: [
    "/api/review/post",
    "/api/review/update/:path*",
    "/api/review/delete/:path*",
  ],
};
