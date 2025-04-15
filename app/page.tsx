import Card from "@/app/components/card";
import { getAllReviews } from "./lib/review";

interface Review {
  _id: string;
  title: string;
  date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const Home = async () => {
  const allReviews = await getAllReviews();
  const listReviews = allReviews.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });
  return (
    <>
      <h2>新着レビュー</h2>
      <div className="row sp-col-2">{listReviews}</div>
    </>
  );
};

export default Home;
