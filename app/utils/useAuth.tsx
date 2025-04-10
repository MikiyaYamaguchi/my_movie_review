import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/user/login");
        return;
      }
      try {
        const secretKey = new TextEncoder().encode("my-movie-review-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        //型キャストして payload の型を確定させる
        const payload = decodedJwt.payload as { email: string };
        setLoginUserEmail(payload.email);
      } catch {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);
  return loginUserEmail;
};

export default useAuth;
