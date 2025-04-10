"use client";

import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Post = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [star, setStar] = useState(1);
  const [thoughts, setThoughts] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString();
      setDate(new Date(formattedDate));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/review/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          date: date,
          genre: genre,
          image: image,
          star: star,
          thoughts: thoughts,
          email: loginUserEmail,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("レビュー投稿失敗");
    }
  };
  if (loginUserEmail) {
    return (
      <div>
        <h1>レビュー投稿</h1>
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
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>公開日</th>
                <td>
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
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
                    required
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
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>星レビュー</th>
                <td>
                  <input
                    type="number"
                    name="star"
                    max="5"
                    min="1"
                    value={star}
                    onChange={(e) => setStar(Number(e.target.value))}
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
                    required
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <button>投稿</button>
        </form>
      </div>
    );
  }
};

export default Post;
