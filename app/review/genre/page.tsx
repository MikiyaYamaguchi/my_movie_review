"use client";

import Card from "@/app/components/card";
import ClientMetadata from "@/app/components/clientMetadata";
import { getReviewByGenre } from "@/app/lib/review";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Review {
  _id: string;
  title: string;
  release_date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const Genre = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "";

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getReviewByGenre(genre, 0);
      setReviews(res);
    };
    fetchReviews();
  }, [genre]);

  const listReviews = reviews.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });

  return (
    <>
      <ClientMetadata
        title={`${genre}レビュー一覧ページ | My Movie Review`}
        description={`${genre}レビューの一覧ページです。`}
      />
      <h1>{genre}</h1>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default function GenrePage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <Genre />
    </Suspense>
  );
}
