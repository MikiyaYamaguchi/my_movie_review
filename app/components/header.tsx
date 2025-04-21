"use client";

import useAuth from "@/app/utils/useAuthHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import header from "../styles/header.module.scss";
import {
  MaterialSymbolsContactPageRounded,
  MaterialSymbolsEditSquareOutlineRounded,
  MaterialSymbolsLogin,
} from "./icons";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const path = usePathname();
  const isTop = path === "/";

  return (
    <header className={header.header}>
      <div className={header.inner}>
        {isTop ? (
          <h1 className={header.title}>
            <Link href="/">My Moview Review</Link>
          </h1>
        ) : (
          <div className={header.title}>
            <Link href="/">My Moview Review</Link>
          </div>
        )}
        <div className={header.gnav}>
          {isAuthenticated ? (
            <>
              <Link href="/user/myPage">
                <MaterialSymbolsContactPageRounded />
                マイページ
              </Link>
              <Link href="/review/post">
                <MaterialSymbolsEditSquareOutlineRounded />
                投稿する
              </Link>
            </>
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
