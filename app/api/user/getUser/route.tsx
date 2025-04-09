import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    await connectDB();
    const user = await UserModel.findOne({ email });
    return NextResponse.json({
      message: "ユーザー取得成功",
      user: user,
    });
  } catch {
    return NextResponse.json({ message: "ユーザー取得失敗" });
  }
}
