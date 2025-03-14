"use client";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

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
    return [];
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
