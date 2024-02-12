import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCookieValue = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState(Cookies.get(cookieName));
  useEffect(() => {
    const checkCookieValue = () => {
      const newCookieValue = Cookies.get(cookieName);
      setCookieValue(newCookieValue);
    };

    const intervalId = setInterval(checkCookieValue, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [cookieName]);

  return cookieValue;
};

export default useCookieValue;
