import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let allReviews;

    if (limit && limit > 0) {
      allReviews = await ReviewModel.find().sort({ _id: -1 }).limit(limit);
    } else {
      allReviews = await ReviewModel.find().sort({ _id: -1 });
    }

    return NextResponse.json({
      message:
        limit && limit > 0
          ? `レビュー読み取り成功（${limit}件・挿入順）`
          : "レビュー読み取り成功（全件・挿入順）",
      allReviews: allReviews,
    });
  } catch (error) {
    return NextResponse.json({
      message: "レビュー読み取り失敗",
      error: String(error),
    });
  }
}
