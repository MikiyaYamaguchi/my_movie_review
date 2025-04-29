"use client";

import Card from "@/app/components/card";
import ClientMetadata from "@/app/components/clientMetadata";
import { getReviewByKeyword } from "@/app/lib/review";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  title: string;
  release_date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const Search = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getReviewByKeyword(keyword);
      setReviews(res);
    };
    fetchReviews();
  }, [keyword]);

  const listReviews = reviews.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });
  return (
    <>
      <ClientMetadata
        title={`${keyword}の検索結果一覧ページ | My Moview Review`}
        description={`${keyword}の検索結果一覧ページです。`}
      />
      <h1>検索：{keyword}</h1>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default Search;
