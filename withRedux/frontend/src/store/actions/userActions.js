"use client"

import * as userService from "@/services/userServices";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "@/store/slices/userSlices";

// Fetch all users
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const users = await userService.getUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message || "Failed to fetch users"));
  }
};

// Create a new user
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch(createUserStart());
    const newUser = await userService.createUser(userData);
    dispatch(createUserSuccess(newUser));
    return newUser;
  } catch (error) {
    dispatch(createUserFailure(error.message || "Failed to create user"));
    throw error;
  }
};

// Update an existing user
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    const updatedUser = await userService.updateUser(id, userData);
    dispatch(updateUserSuccess(updatedUser));
    return updatedUser;
  } catch (error) {
    dispatch(updateUserFailure(error.message || "Failed to update user"));
    throw error;
  }
};

// Delete a user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await userService.deleteUser(id);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure(error.message || "Failed to delete user"));
    throw error;
  }
};