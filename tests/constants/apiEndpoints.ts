export const API_ENDPOINTS = {
  CREATE_BOOKING: "/booking",
  GET_BOOKING: (id: number) => `/booking/${id}`,
  GET_ALLBOOKINGS: "/booking",
  UPDATE_BOOKING: (id: number) => `/booking/${id}`,
  DELETE_BOOKING: (id: number) => `/booking/${id}`,
  AUTHENTICATE: "/auth",
};
