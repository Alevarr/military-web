import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../types";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = () => {
      const token = Cookies.get("token");
      if (!token) return;
      const decodedToken: User = jwtDecode(token);
      setUser({ email: decodedToken.email, role: decodedToken.role });
    };
    getUser();
  }, []);

  return user;
};

export default useUser;
