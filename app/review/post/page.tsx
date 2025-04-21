"use client";

import { MaterialSymbolsSearchRounded } from "@/app/components/icons";
import { getMovieByTitle, getMovieGenre } from "@/app/lib/movie";
import post from "@/app/styles/post.module.scss";
import useAuth from "@/app/utils/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Movie {
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  genre_ids: number[];
  poster_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

const Post = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [overview, setOverview] = useState("");
  const [star, setStar] = useState(1);
  const [thoughts, setThoughts] = useState("");
  const [movie, setMovie] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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
          overview: overview,
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

  const searchMovie = async () => {
    try {
      setError("");
      const movieData = await getMovieByTitle(title);
      setMovie(movieData);
      if (movieData.length) {
        setModalOpen(true);
      } else {
        alert("映画が見つかりませんでした。");
      }
    } catch (err) {
      setError("映画情報の取得に失敗しました");
      console.error(err);
    }
  };

  const selectMovie = (item: Movie) => {
    setTitle(item.title);
    setDate(new Date(item.release_date));
    setImage(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
    const genreNames = item.genre_ids
      .map((genre_id) => {
        const matchedGenre = genres.find((g) => g.id === genre_id);
        return matchedGenre ? matchedGenre.name : "不明ジャンル";
      })
      .join(",");
    setGenre(genreNames);
    setOverview(item.overview);
    setModalOpen(false);
  };

  const fetchGenres = async () => {
    const genreData = await getMovieGenre();
    setGenres(genreData);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  if (loginUserEmail) {
    return (
      <div>
        <h1>レビュー投稿</h1>
        <p>
          映画情報を検索して、星レビュー、感想を入力してください。
          <br />
          ※公開日、ジャンル、ポスター画像は手入力できません
          <br />
          ※映画名を入力して検索を押すと、映画情報一覧が表示されるので、該当の映画を選択してください
        </p>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>
                  タイトル<span className={post.required}>必須</span>
                </th>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={post.input}
                    required
                  />
                  <button
                    type="button"
                    onClick={searchMovie}
                    className={post.searchBtn}
                  >
                    <MaterialSymbolsSearchRounded />
                    映画情報を検索する
                  </button>
                  <div
                    className={`${post.movieSearchModal} ${
                      modalOpen ? post.modalOpen : ""
                    }`}
                  >
                    <div className={post.modalInner}>
                      <div
                        className={post.close}
                        onClick={() => setModalOpen(false)}
                      ></div>
                      <p>下記の映画がヒットしました。</p>
                      {movie.length > 0 ? (
                        <div className="row sp-col-2">
                          {movie.map((item, index) => (
                            <div className="col span_4" key={index}>
                              <div className={post.imgWrap}>
                                <Image
                                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                  fill
                                  alt={item.title}
                                />
                              </div>
                              <p className={post.selectMovieTitle}>
                                {item.title}
                              </p>
                              <button
                                type="button"
                                onClick={() => selectMovie(item)}
                              >
                                この映画を選択
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>映画が見つかりませんでした。</p>
                      )}
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>公開日</th>
                <td>
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    className={post.input}
                    required
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
                    className={post.input}
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
                    className={post.input}
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
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className={post.input}
                    rows={10}
                    required
                    readOnly
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th>
                  星レビュー<span className={post.required}>必須</span>
                </th>
                <td>
                  <span className={post.star}>★</span>
                  <input
                    type="number"
                    name="star"
                    max="5"
                    min="1"
                    value={star}
                    onChange={(e) => setStar(Number(e.target.value))}
                    className={post.input_shrot}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>
                  感想<span className={post.required}>必須</span>
                </th>
                <td>
                  <textarea
                    name="thoughts"
                    id="thoughts"
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    className={post.input}
                    rows={30}
                    required
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <button className={post.submit}>投稿</button>
        </form>
      </div>
    );
  }
};

export default Post;
