//ユーザー情報取得
export const getUser = async (email: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/getUser`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				email: email,
			}),
		});
		const jsonData = await response.json();
		console.log("ユーザーの取得に成功しました");
		return jsonData.user;
	} catch {
		console.error("ユーザーの取得に失敗しました。");
	}
};