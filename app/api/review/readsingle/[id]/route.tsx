import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const singleRevew = await ReviewModel.findById(id);
    return NextResponse.json({
      message: "レビュー読み取り成功（シングル）",
      singleRevew: singleRevew,
    });
  } catch {
    return NextResponse.json({ message: "レビュー読み取り失敗（シングル）" });
  }
}
