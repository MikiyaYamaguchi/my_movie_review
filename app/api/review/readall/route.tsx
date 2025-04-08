import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const allReviews = await ReviewModel.find();
    return NextResponse.json({
      message: "レビュー読み取り成功(オール)",
      allReviews: allReviews,
    });
  } catch {
    return NextResponse.json({ message: "レビュー読み取り失敗(オール)" });
  }
}
