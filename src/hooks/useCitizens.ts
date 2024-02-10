import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { Citizen } from "../types";

const useCitizens = () =>
  useQuery<Citizen[], Error>({
    queryKey: ["citizens"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.CITIZENS;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      return await res.json();
    },
  });

export default useCitizens;
