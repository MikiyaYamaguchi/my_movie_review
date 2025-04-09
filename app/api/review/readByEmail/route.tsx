import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const email = request.nextUrl.searchParams.get("email");
    const reviews = await ReviewModel.find({ email: email });
    return NextResponse.json({
      message: "レビュー読み取り成功(マイページ表示)",
      reviews: reviews,
    });
  } catch {
    return NextResponse.json({
      message: "レビュー読み取り失敗(マイページ表示)",
    });
  }
}
