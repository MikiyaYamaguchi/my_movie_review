import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const allRevews = await ReviewModel.find();
    return NextResponse.json({
      message: "レビュー読み取り成功(オール)",
      allRevews: allRevews,
    });
  } catch {
    return NextResponse.json({ message: "レビュー読み取り失敗(オール)" });
  }
}
