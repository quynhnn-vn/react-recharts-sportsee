import axios from "./axios";

export const getUserInfo = (userId: number) => axios.get(`/user/${userId}`);

export const getUserActivity = (userId: number) =>
  axios.get(`/user/${userId}/activity`);

export const getUserAverageSessions = (userId: number) =>
  axios.get(`/user/${userId}/average-sessions`);

export const getUserPerformance = (userId: number) =>
  axios.get(`/user/${userId}/performance`);
