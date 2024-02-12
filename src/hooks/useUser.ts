import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../types";
import useCookieValue from "./useCookieValue";

const useUser = () => {
  const token = useCookieValue("token");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = () => {
      if (!token) {
        setUser(null);
        return;
      }
      const decodedToken: User = jwtDecode(token);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    };

    getUser();
  }, [token]);

  return user;
};

export default useUser;
