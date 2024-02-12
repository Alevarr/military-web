import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAutoCheckTokenExpiration = (expireCallback: () => void) => {
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = Cookies.get("token");
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp) {
        if (decodedToken.exp < currentTime) {
          Cookies.remove("token");
          expireCallback();
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 20 * 1000);

    return () => clearInterval(intervalId);
  }, [expireCallback]);
};

export default useAutoCheckTokenExpiration;
