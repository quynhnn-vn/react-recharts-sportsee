import axios from "./axios";

export const getUserInfo = (userId: number) =>
  axios.get(`http://localhost:3000/user/${userId}`);

export const getUserActivity = (userId: number) =>
  axios.get(`http://localhost:3000/user/${userId}/activity`);

export const getUserAverageSessions = (userId: number) =>
  axios.get(`http://localhost:3000/user/${userId}/average-sessions`);

export const getUserPerformance = (userId: number) =>
  axios.get(`http://localhost:3000/user/${userId}/performance`);
