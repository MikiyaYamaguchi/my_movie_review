import Card from "@/app/components/card";
import { getReviewByStar } from "@/app/lib/review";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { star: string };
}): Promise<Metadata> => {
  const star = Number(params.star);

  return {
    title: `星${star}レビュー | My Movie Review`,
    description: `星${star}レビューの一覧ページです。`,
  };
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

const Star = async (context: { params: Promise<{ star: number }> }) => {
  const { star } = await context.params;
  const reviewsByStar = await getReviewByStar(star, 0);
  const listReviews = reviewsByStar.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });
  return (
    <>
      <h1>星{star}のレビュー</h1>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default Star;
