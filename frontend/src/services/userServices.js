"use client";
import axios from "axios";

// Directly use the deployed URL (no fallback to localhost)
const API_URL = "https://userhub-yk57.onrender.com/users";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getUsers = async () => {
  try {
    const response = await api.get("/getUser");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return empty array instead of null
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/createUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};