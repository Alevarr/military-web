export const API_ENDPOINTS = {
  /** @GET Get list of all registered ctitizens */
  CITIZENS: "/api/citizens",

  /** @GET Get specific citizen by id */
  CITIZEN: (id: string) => `/api/citizens/${id}`,
};
