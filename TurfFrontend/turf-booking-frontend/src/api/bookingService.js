import api from "./axiosConfig";

export const createBooking = (data) => {
  return api.post("/bookings", data);
};

export const getAllBookings = () => {
  return api.get("/bookings");
};
