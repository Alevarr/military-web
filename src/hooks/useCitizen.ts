import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { CitizenFull } from "../types";

const useCitizen = (id: string) =>
  useQuery<CitizenFull, Error>({
    queryKey: ["citizen", id],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.CITIZEN(id);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      return await res.json();
    },
  });

export default useCitizen;
