import conntectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await conntectDB();
    const { id } = await context.params;
    await ReviewModel.deleteOne({ _id: id });
    return NextResponse.json({ message: "レビュー削除成功" });
  } catch {
    return NextResponse.json({ message: "レビュー削除失敗" });
  }
}
