import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const token = await request.headers.get("Authorization")?.split(" ")[1];
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1pa2l5YWdyZWVlZW5AZ21haWwuY29tIiwiZXhwIjoxNzQ0MjA1NTk2fQ.RWpFpeWsH_JMkPX6eNc6nVZBsVJycQkmlBBoFY5USZo";
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
