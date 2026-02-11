import axios from "./axiosConfig";

export const getAllTurfs = () => {
  return axios.get("/turfs");
};

export const createTurf = (data) => {
  return axios.post("/turfs", data);
};

export const deleteTurf = (id) => {
  return axios.delete(`/turfs/${id}`);
};
