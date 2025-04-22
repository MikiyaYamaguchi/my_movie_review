import Card from "@/app/components/card";

interface Review {
  _id: string;
  title: string;
  date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const listReviews = reviews.map((review: Review) => {
    return <Card review={review} key={review._id} />;
  });
  return <div className="row sp-col-2">{listReviews}</div>;
};

export default ReviewList;
