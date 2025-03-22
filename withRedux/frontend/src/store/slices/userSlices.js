"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Users list operations
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create user operations
    createUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update user operations
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.loading = false;
      state.currentUser = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete user operations
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Current user operations
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
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
  deleteUserFailure,
  setCurrentUser,
  clearCurrentUser,
  clearError
} = userSlice.actions;

export default userSlice.reducer;