import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const keywordParam = request.nextUrl.searchParams.get("keyword");
    const reviews = await ReviewModel.find({
      $or: [
        { title: { $regex: keywordParam, $options: "i" } },
        { thoughts: { $regex: keywordParam, $options: "i" } },
        { genre: { $regex: keywordParam, $options: "i" } },
        { overview: { $regex: keywordParam, $options: "i" } },
      ],
    });
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
