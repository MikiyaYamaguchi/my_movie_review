import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      const isPasswordMatch = await bcrypt.compare(
        reqBody.password,
        savedUserData.password
      );
      if (isPasswordMatch) {
        const secretKey = new TextEncoder().encode("my-movie-review-app-book");
        const payload = {
          email: reqBody.email,
        };
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);
        return NextResponse.json({
          message: "ログイン成功",
          token,
          status: 200,
        });
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
          status: 401,
        });
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗：ユーザー登録をしてください",
        status: 404,
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" }, { status: 500 });
  }
}
