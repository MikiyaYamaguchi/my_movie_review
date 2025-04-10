import conntectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await conntectDB();
    const reqBody = await request.json();
    const { id } = await context.params;
    const singleReview = await ReviewModel.findById(id);
    if (singleReview.email === reqBody.email) {
      await ReviewModel.deleteOne({ _id: id });
      return NextResponse.json({ message: "レビュー削除成功" });
    } else {
      return NextResponse.json({ message: "他の人が投稿したレビューです" });
    }
  } catch {
    return NextResponse.json({ message: "レビュー削除失敗" });
  }
}
