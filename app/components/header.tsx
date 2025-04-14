"use client";

import useAuth from "@/app/utils/useAuth";
import Link from "next/link";
import header from "../styles/header.module.scss";
import {
  MaterialSymbolsContactPageRounded,
  MaterialSymbolsLogin,
} from "./icons";

const Header = () => {
  const loginUserEmail = useAuth();
  return (
    <header className={header.header}>
      <div className={header.inner}>
        <h1>
          <Link href="/">My Moview Review</Link>
        </h1>
        <div className={header.gnav}>
          {loginUserEmail ? (
            <Link href="/user/myPage">
              <MaterialSymbolsContactPageRounded />
              マイページ
            </Link>
          ) : (
            <Link href="/user/login">
              <MaterialSymbolsLogin />
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
