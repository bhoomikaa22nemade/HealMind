import axios from "axios";

const API_BASE_URL = "https://healmind-midr.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT token (if present) to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("HealMind_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ----------------------- Counsellors ----------------------- */

export const getCounsellors = async ({ search = "", specialization = "all", sort = "" } = {}) => {
  const params = {};
  if (search) params.search = search;
  if (specialization && specialization !== "all") params.specialization = specialization;
  if (sort) params.sort = sort;

  const { data } = await api.get("/counsellors", { params });
  return data; // { success, count, data }
};

export const getCounsellorById = async (id) => {
  const { data } = await api.get(`/counsellors/${id}`);
  return data;
};

/* ----------------------- Bookings ----------------------- */

export const bookSession = async (payload) => {
  const { data } = await api.post("/bookings", payload);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await api.get("/bookings/mine");
  return data; // { success, count, data }
};

export const getBookingById = async (id) => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await api.patch(`/bookings/${id}/cancel`);
  return data;
};

/* ----------------------- Auth ----------------------- */

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export default api;