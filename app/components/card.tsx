import card from "@/app/styles/card.module.scss";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Review {
  _id: string;
  title: string;
  date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const Card = ({ review }: { review: Review }) => {
  let starReview = "";
  for (let i = 0; i < Number(review.star); i++) {
    starReview += "★";
  }
  const genreArray = review.genre.split(",");
  const date = format(new Date(review.date), "yyyy.M.d");
  return (
    <div key={review._id} className="col span_3">
      <Link href={`/review/single/${review._id}`} className={card.card}>
        <div className={card.imgWrap}>
          <Image src={review.image} fill alt={review.title} />
        </div>
        <p className={card.title}>{review.title}</p>
        <p className={card.date}>{date}</p>
        <p className={card.star}>{starReview}</p>
        <p className={card.genre}>
          {genreArray.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </p>
        <p className={card.thoughts}>{review.thoughts}</p>
      </Link>
    </div>
  );
};

export default Card;
