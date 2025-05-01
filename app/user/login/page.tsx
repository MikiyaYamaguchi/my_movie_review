"use client";
import ClientMetadata from "@/app/components/clientMetadata";
import Loading from "@/app/components/loading";
import login from "@/app/styles/login.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const jsonData = await response.json();
      if (jsonData.status === 200) {
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("email", user.email);
        alert(jsonData.message);
        router.push("/user/myPage");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert(jsonData.message);
      }
    } catch {
      alert("ログイン失敗");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <ClientMetadata
        title={`ログイン | My Moview Review`}
        description={`ログインページです。`}
      />
      {isSubmitting && <Loading />}
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>メールアドレス</th>
              <td>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="xxx@xxx.com"
                  className={login.input}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>パスワード</th>
              <td>
                <input
                  type="text"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className={login.input}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className={login.submit}>ログイン</button>
      </form>
      <div className={login.registerLink}>
        <Link href="/user/register">会員登録はこちら</Link>
      </div>
    </div>
  );
};

export default Login;
