"use client";

import { getSingleReview } from "@/app/lib/review";
import update from "@/app/styles/update.module.scss";
import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Update = (context: { params: Promise<{ id: string }> }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [overview, setOverview] = useState("");
  const [star, setStar] = useState(1);
  const [thoughts, setThoughts] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(() => {
    const getTargetReview = async () => {
      const { id } = await context.params;
      const singleReview = await getSingleReview(id);
      setTitle(singleReview.title);
      setDate(singleReview.release_date);
      setGenre(singleReview.genre);
      setImage(singleReview.image);
      setOverview(singleReview.overview);
      setStar(singleReview.star);
      setThoughts(singleReview.thoughts);
      setEmail(singleReview.email);
      setLoading(true);
    };
    getTargetReview();
  }, []);

  const handleDateChange = (release_date: Date | null) => {
    if (release_date) {
      const formattedDate = release_date.toISOString();
      setDate(new Date(formattedDate));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id } = await context.params;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/review/update/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            release_date: date,
            genre: genre,
            image: image,
            overview: overview,
            star: star,
            thoughts: thoughts,
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/user/myPage");
      router.refresh();
    } catch {
      alert("レビュー更新失敗");
    }
  };
  if (loading) {
    if (loginUserEmail === email) {
      return (
        <div>
          <h1>レビュー更新</h1>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={update.input}
                      required
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>公開日</th>
                  <td>
                    <DatePicker
                      selected={date}
                      onChange={handleDateChange}
                      className={update.input}
                      dateFormat="yyyy/MM/dd"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>ジャンル</th>
                  <td>
                    <input
                      type="text"
                      name="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className={update.input}
                      required
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>ポスター画像</th>
                  <td>
                    <input
                      type="text"
                      name="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className={update.input}
                      required
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>あらすじ</th>
                  <td>
                    <textarea
                      name="overview"
                      id="overview"
                      onChange={(e) => setOverview(e.target.value)}
                      className={update.input}
                      rows={10}
                      required
                      readOnly
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>星レビュー</th>
                  <td>
                    <span className={update.star}>★</span>
                    <input
                      type="number"
                      name="star"
                      max="5"
                      min="1"
                      value={star}
                      onChange={(e) => setStar(Number(e.target.value))}
                      className={update.input_shrot}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>感想</th>
                  <td>
                    <textarea
                      name="thoughts"
                      id="thoughts"
                      value={thoughts}
                      onChange={(e) => setThoughts(e.target.value)}
                      className={update.input}
                      rows={30}
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className={update.submit}>更新</button>
          </form>
        </div>
      );
    }
  } else {
    return <p>ローディング中...</p>;
  }
};

export default Update;
