import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";

export type Citizen = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  passport: string;
  feasibility_category: string;
  deferment_end_date?: string;
};

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
