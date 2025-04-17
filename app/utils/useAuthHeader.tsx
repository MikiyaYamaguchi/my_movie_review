import { jwtVerify } from "jose";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoginUserEmail(null);
        setIsAuthChecked(true);
        return;
      }

      try {
        const secretKey = new TextEncoder().encode("my-movie-review-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        const payload = decodedJwt.payload as { email: string };
        setLoginUserEmail(payload.email);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("JWT verification failed:", error);
        setIsAuthenticated(false);
        setLoginUserEmail(null);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkToken();
  }, []);

  return { isAuthenticated, loginUserEmail, isAuthChecked };
};

export default useAuth;
