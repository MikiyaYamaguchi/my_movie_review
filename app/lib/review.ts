//レビューを全て取得
export const getAllReviews = async () => {
  const response = await fetch("http://localhost:3000/api/review/readall", {
    cache: "no-store",
  });
  const jsonData = await response.json();
  const allReviews = jsonData.allReviews;
  return allReviews;
};

//レビューを一つだけ取得
export const getSingleReview = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/review/readsingle/${id}`,
    { cache: "no-cache" }
  );
  const jsonData = await response.json();
  const singleReview = jsonData.singleReview;
  return singleReview;
};

//レビューをメールアドレスを元に取得
export const getReviewByEmail = async (email: string) => {
  const response = await fetch(
    `http://localhost:3000/api/review/readByEmail?email=${email}`,
    { cache: "no-cache" }
  );
  const jsonData = await response.json();
  const reviews = jsonData.reviews;
  return reviews;
};