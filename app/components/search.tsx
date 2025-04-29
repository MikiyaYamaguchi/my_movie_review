"use client";

import { getMovieGenre } from "@/app/lib/movie";
import search from "@/app/styles/search.module.scss";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

const Search = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const [keyword, setKeyword] = useState("");
  const pathname = usePathname();

  const hiddenPaths = [
    "/user/myPage",
    "/review/post",
    "/review/update",
    "/user/login",
    "/user/register",
  ];

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/review/search?keyword=${keyword}`);
    router.refresh();
  };

  const handleStarSelect = (val: string) => {
    if (val == null || val == "") {
      return;
    }
    router.push(`/review/star/${val}`);
    router.refresh();
  };

  const handleGenreSelect = (val: string) => {
    if (val == null || val == "") {
      return;
    }
    router.push(`/review/genre?genre=${val}`);
    router.refresh();
  };

  const fetchGenres = async () => {
    const genreData = await getMovieGenre();
    setGenres(genreData);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const shouldHide = hiddenPaths.some((path) => pathname.includes(path));

  if (shouldHide) return null;

  return (
    <div className={search.searchWrap}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="キーワード検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button>検索</button>
      </form>
      <div className={search.selectSearchWrap}>
        <form>
          <span>カテゴリーから探す：</span>
          <select onChange={(e) => handleGenreSelect(e.target.value)}>
            <option value="">選択する</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
            <option value=""></option>
          </select>
        </form>
        <form>
          <span>星レビュー数から探す：</span>
          <select onChange={(e) => handleStarSelect(e.target.value)}>
            <option value="">選択する</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★</option>
            <option value="3">★★★</option>
            <option value="2">★★</option>
            <option value="1">★</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Search;
