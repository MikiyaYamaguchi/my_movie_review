"use client";

import search from "@/app/styles/search.module.scss";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
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
    </div>
  );
};

export default Search;
