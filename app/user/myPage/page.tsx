"use client";

import ClientMetadata from "@/app/components/clientMetadata";
import {
  MaterialSymbolsEditSquareOutlineRounded2,
  MaterialSymbolsLogout,
} from "@/app/components/icons";
import { deleteReview, getReviewByEmail } from "@/app/lib/review";
import { getUser } from "@/app/lib/user";
import card from "@/app/styles/card.module.scss";
import myPage from "@/app/styles/myPage.module.scss";
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
  release_date: Date;
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

  const handleLogout = () => {
    const confirmed = window.confirm("ログアウトしますか？");
    if (confirmed) {
      localStorage.removeItem("token");
      router.refresh();
      location.reload();
    }
  };

  const listReviews = reviews.map((review: Review) => {
    let starReview = "";
    for (let i = 0; i < Number(review.star); i++) {
      starReview += "★";
    }
    const genreArray = review.genre.split(",");
    const date = format(new Date(review.release_date), "yyyy.M.d");
    return (
      <div key={review._id} className="col span_2">
        <Link href={`/review/single/${review._id}`} className={card.card}>
          <div className={card.imgWrap}>
            <Image src={review.image} fill alt={review.title} />
          </div>
          <p className={card.title}>{review.title}</p>
          <p className={card.release_date}>公開日：{date}</p>
          <p className={card.star}>{starReview}</p>
          <p className={card.genre}>
            {genreArray.map((genre, index) => (
              <span key={index}>{genre}</span>
            ))}
          </p>
          <p className={card.thoughts}>{review.thoughts}</p>
        </Link>
        <Link href={`/review/update/${review._id}`} className={card.updateBtn}>
          編集する
        </Link>
        <button
          onClick={() => handleDelete(review._id)}
          className={card.deleteBtn}
        >
          削除する
        </button>
      </div>
    );
  });
  if (loginUserEmail === user.email) {
    return (
      <div>
        <ClientMetadata
          title={`マイページ | My Moview Review`}
          description={`マイページです。`}
        />
        <h1>マイページ</h1>
        <div className={myPage.userOperationWrap}>
          <p>
            <Link href="/review/post">
              <MaterialSymbolsEditSquareOutlineRounded2 />
              レビューを投稿する
            </Link>
          </p>
          <p className={myPage.logout} onClick={handleLogout}>
            <MaterialSymbolsLogout />
            ログアウト
          </p>
        </div>
        <section>
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
        </section>
        <section>
          <h2>投稿レビュー</h2>
          <div className="row sp-col-2">
            {reviews.length > 0 ? (
              listReviews
            ) : (
              <p>投稿した記事がありません。</p>
            )}
          </div>
        </section>
      </div>
    );
  }
};

export default MyPage;
