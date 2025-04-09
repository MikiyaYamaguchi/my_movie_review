import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
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
    let starReview = "";
    for (let i = 0; i < Number(review.star); i++) {
      starReview += "★";
    }
    const date = format(new Date(review.date), "yyyy.M.d");
    return (
      <div key={review._id}>
        <Link href={`/review/single/${review._id}`}>
          <div
            style={{
              position: "relative",
              maxWidth: "300px",
              paddingTop: "30%",
            }}
          >
            <Image
              src={review.image}
              fill
              style={{ objectFit: "contain" }}
              alt={review.title}
            />
          </div>
          <p>{review.title}</p>
          <p>{date}</p>
          <p>{starReview}</p>
          <p>{review.genre}</p>
          <p>{review.thoughts}</p>
        </Link>
      </div>
    );
  });
  return <div>{listReviews}</div>;
};

export default Home;
