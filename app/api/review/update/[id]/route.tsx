import connectDB from "@/app/utils/database";
import { ReviewModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const reqBody = await request.json();
  try {
    await connectDB;
    const { id } = await context.params;
    await ReviewModel.updateOne({ _id: id }, reqBody);
    return NextResponse.json({ message: "レビュー更新成功" });
  } catch {
    return NextResponse.json({ message: "レビュー更新失敗" });
  }
}
