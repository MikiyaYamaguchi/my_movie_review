import { getSingleReview } from "@/app/lib/review";
import { format } from "date-fns";
import Image from "next/image";

const Review = async (context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const singleReview = await getSingleReview(id);

  let starReview = "";
  for (let i = 0; i < Number(singleReview.star); i++) {
    starReview += "★";
  }
  const date = format(new Date(singleReview.date), "yyyy.M.d");
  return (
    <div>
      <div
        style={{
          position: "relative",
          maxWidth: "300px",
          paddingTop: "30%",
        }}
      >
        <Image
          src={singleReview.image}
          fill
          style={{ objectFit: "contain" }}
          alt={singleReview.title}
        />
      </div>
      <div>
        <h2>{singleReview.title}</h2>
        <p>{date}</p>
        <p>{starReview}</p>
        <p>{singleReview.genre}</p>
        <p>{singleReview.thoughts}</p>
      </div>
    </div>
  );
};

export default Review;
