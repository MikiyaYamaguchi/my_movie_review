"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface User {
  email: string;
  password: string;
}

const Login = () => {
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
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const jsonData = await response.json();
      if (jsonData.status === 200) {
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("email", user.email);
        alert(jsonData.message);
        router.push("/user/myPage");
        router.refresh();
      } else {
        alert(jsonData.message);
      }
    } catch {
      alert("ログイン失敗");
    }
  };
  return (
    <div>
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
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
