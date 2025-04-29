import Card from "@/app/components/card";
import { getAllReviews } from "@/app/lib/review";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新着レビュー | My Movie Review",
  description: "My Movie Reviewの新着レビュー一覧ページです。",
};

interface Review {
  _id: string;
  title: string;
  release_date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const New = async () => {
  const allReviews = await getAllReviews(0);
  const listReviews = allReviews.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });
  return (
    <>
      <h1>新着レビュー</h1>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default New;
