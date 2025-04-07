import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      if (reqBody.password === savedUserData.password) {
        return NextResponse.json({ message: "ログイン成功" });
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
        });
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗：ユーザー登録をしてください",
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
