//レビューを全て取得
export const getAllReviews = async (limit: number) => {
  const response = await fetch(`http://localhost:3000/api/review/readall?limit=${limit}`, {
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

//レビューを星レビューを元に取得
export const getReviewByStar = async (star: number,limit: number) => {
  const response = await fetch(
    `http://localhost:3000/api/review/readByStar?star=${star}&limit=${limit}`,
    { cache: "no-cache" }
  );
  const jsonData = await response.json();
  const reviews = jsonData.reviews;
  return reviews;
};

//レビューを削除
export const deleteReview = async(id: string, email: string) => {
	try {
		const response = await fetch(`http://localhost:3000/api/review/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				email: email
			})
		})
		const jsonData = await response.json();
		alert(jsonData.message)
	} catch {
		alert("アイテム削除失敗")
	}
}