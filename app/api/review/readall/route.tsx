import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "レビューを全て読み取り" });
}
