export const API_ENDPOINTS = {
  /** @GET Get list of all registered ctitizens */
  CITIZENS: "/api/citizens",

  /** @GET Get specific citizen by id */
  CITIZEN: (id: string) => `/api/citizens/${id}`,

  /** @POST Authorize with email and password */
  AUTH: "/api/auth",

  /** @POST Create new citizen */
  CREATE_CITIZEN: "/api/citizens",

  /** @POST Create new military */
  CREATE_MILITARY: "/api/militaries",
};
