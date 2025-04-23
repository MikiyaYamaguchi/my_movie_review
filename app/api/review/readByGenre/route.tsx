import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const genreParam = request.nextUrl.searchParams.get("genre");
    const limitParam = request.nextUrl.searchParams.get("limit");

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let reviews;

    if (limit && limit > 0) {
      if (genreParam) {
        reviews = await ReviewModel.aggregate([
          { $match: { genre: { $regex: genreParam, $options: "i" } } },
          { $sample: { size: limit } },
        ]);
      } else {
        reviews = await ReviewModel.aggregate([{ $sample: { size: limit } }]);
      }
    } else {
      reviews = genreParam
        ? await ReviewModel.find({
            genre: { $regex: genreParam, $options: "i" },
          })
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
