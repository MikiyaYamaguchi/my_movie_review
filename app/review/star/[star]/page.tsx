import Card from "@/app/components/card";
import ClientMetadata from "@/app/components/clientMetadata";
import { getReviewByStar } from "@/app/lib/review";

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
      <ClientMetadata
        title={`星${star}レビュー | My Movie Review`}
        description={`星${star}レビューの一覧ページです。`}
      />
      <h1>星{star}のレビュー</h1>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default Star;
