import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const starParam = request.nextUrl.searchParams.get("star");
    const limitParam = request.nextUrl.searchParams.get("limit");

    const star = starParam ? parseInt(starParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let reviews;

    if (limit && limit > 0) {
      if (star !== undefined && !isNaN(star)) {
        reviews = await ReviewModel.aggregate([
          { $match: { star: star } },
          { $sample: { size: limit } },
        ]);
      } else {
        reviews = await ReviewModel.aggregate([{ $sample: { size: limit } }]);
      }
    } else {
      reviews =
        star !== undefined && !isNaN(star)
          ? await ReviewModel.find({ star: star })
          : await ReviewModel.find();
    }

    return NextResponse.json({
      message: "レビュー読み取り成功（ランダム含む）",
      reviews: reviews,
    });
  } catch (error) {
    return NextResponse.json({
      message: "レビュー読み取り失敗（ランダム含む）",
      error: String(error),
    });
  }
}
