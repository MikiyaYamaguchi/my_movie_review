import Card from "@/app/components/card";
import { getAllReviews } from "@/app/lib/review";

interface Review {
  _id: string;
  title: string;
  date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const New = async () => {
  const allReviews = await getAllReviews();
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
