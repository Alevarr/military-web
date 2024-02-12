import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { Department } from "../types";

const useDepartments = () =>
  useQuery<Department[], Error>({
    queryKey: ["departments"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.DEPARTMENTS;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      return await res.json();
    },
  });

export default useDepartments;
