import Cookies from "js-cookie";

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const bearer = Cookies.get("token");
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  });
  return res;
};
