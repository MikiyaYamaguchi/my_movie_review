import ReviewList from "./components/reviewList";
import { getAllReviews } from "./lib/review";

const Home = async () => {
  const allReviews = await getAllReviews();
  console.log(allReviews);
  return (
    <>
      <h2>新着レビュー</h2>
      <ReviewList reviews={allReviews} />
    </>
  );
};

export default Home;
