"use client";

import ClientMetadata from "@/app/components/clientMetadata";
import Loading from "@/app/components/loading";
import { getSingleReview } from "@/app/lib/review";
import update from "@/app/styles/update.module.scss";
import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const thoughtsRef = useRef<HTMLTextAreaElement>(null);

  const handleThoughtsInput = () => {
    const thoughtsTextarea = thoughtsRef.current;
    if (thoughtsTextarea) {
      thoughtsTextarea.style.height = "auto";
      thoughtsTextarea.style.height = `${thoughtsTextarea.scrollHeight}px`;

      const bottomPosition =
        thoughtsTextarea.offsetTop + thoughtsTextarea.offsetHeight;
      if (window.scrollY + window.innerHeight < bottomPosition + 20) {
        window.scrollTo({
          top: bottomPosition - window.innerHeight + 100,
          behavior: "smooth",
        });
      }
    }
  };

  if (loading) {
    if (loginUserEmail === email) {
      return (
        <div>
          <ClientMetadata
            title={`レビュー更新 | My Moview Review`}
            description={`レビュー更新ページです。`}
          />
          {isSubmitting && <Loading />}
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
                      value={overview}
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
                    <select
                      name="star"
                      value={star}
                      onChange={(e) => setStar(Number(e.target.value))}
                      className={update.select}
                      required
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>感想</th>
                  <td>
                    <textarea
                      ref={thoughtsRef}
                      name="thoughts"
                      id="thoughts"
                      value={thoughts}
                      onChange={(e) => setThoughts(e.target.value)}
                      onInput={handleThoughtsInput}
                      className={update.input}
                      rows={30}
                      style={{ overflow: "hidden", resize: "none" }}
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
    return <Loading />;
  }
};

export default Update;
