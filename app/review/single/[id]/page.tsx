import { format } from "date-fns";
import Image from "next/image";

const getSingleItem = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/review/readsingle/${id}`,
    { cache: "no-cache" }
  );
  const jsonData = await response.json();
  const singleReview = jsonData.singleReview;
  return singleReview;
};

const Review = async (context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const singleReview = await getSingleItem(id);

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
