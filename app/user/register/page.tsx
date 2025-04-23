"use client";

import register from "@/app/styles/register.module.scss";
import React, { ChangeEvent, useState } from "react";

interface NewUser {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch {
      alert("ユーザー登録失敗");
    }
  };
  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>
                名前<span className={register.required}>必須</span>
              </th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  placeholder="山田　太郎"
                  className={register.input}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                メールアドレス<span className={register.required}>必須</span>
              </th>
              <td>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="xxx@xxx.com"
                  className={register.input}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                パスワード<span className={register.required}>必須</span>
              </th>
              <td>
                <input
                  type="text"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder=""
                  className={register.input}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className={register.submit}>登録</button>
      </form>
    </div>
  );
};

export default Register;
