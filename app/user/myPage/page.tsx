"use client";

import { deleteReview, getReviewByEmail } from "@/app/lib/review";
import { getUser } from "@/app/lib/user";
import useAuth from "@/app/utils/useAuth";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface Review {
  _id: string;
  title: string;
  date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const MyPage = () => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();
  const loginUserEmail = useAuth();

  const getUserInfo = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      return;
    }
    const userInfo = await getUser(email);
    setUser({
      name: userInfo.name,
      email: userInfo.email,
    });
  };
  const getReviews = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      return;
    }
    const getReviews = await getReviewByEmail(email);
    setReviews(getReviews);
  };
  useEffect(() => {
    getUserInfo();
    getReviews();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteReview(id, loginUserEmail);
    router.refresh();
    location.reload();
  };

  const listReviews = reviews.map((review: Review) => {
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
        <Link href={`/review/update/${review._id}`}>編集する</Link>
        <button onClick={() => handleDelete(review._id)}>削除する</button>
      </div>
    );
  });
  if (loginUserEmail === user.email) {
    return (
      <div>
        <h1>マイページ</h1>
        <div>
          <h2>ユーザー情報</h2>
          <table>
            <tbody>
              <tr>
                <th>ユーザー名</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>メールアドレス</th>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>投稿レビュー</h2>
          {listReviews}
        </div>
      </div>
    );
  }
};

export default MyPage;
