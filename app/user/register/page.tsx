"use client";

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
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
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
                名前<span>必須</span>
              </th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  placeholder="山田　太郎"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                メールアドレス<span>必須</span>
              </th>
              <td>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="xxx@xxx.com"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                パスワード<span>必須</span>
              </th>
              <td>
                <input
                  type="text"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
