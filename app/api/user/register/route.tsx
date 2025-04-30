import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { password, ...otherData } = reqBody;
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ ...otherData, password: hashedPassword });
    return NextResponse.json({ message: "ユーザー登録成功" });
  } catch {
    return NextResponse.json({ message: "ユーザー登録失敗" });
  }
}
