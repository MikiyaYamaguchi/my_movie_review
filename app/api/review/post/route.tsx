import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    await connectDB();
    await ReviewModel.create(reqBody);
    return NextResponse.json({ message: "レビュー投稿成功" });
  } catch {
    return NextResponse.json({ message: "レビュー投稿失敗" });
  }
}
