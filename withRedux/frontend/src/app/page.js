"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/store/actions/userActions";
import { setCurrentUser, clearCurrentUser, clearError } from "@/store/slices/userSlices";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const dispatch = useDispatch();
  const { users, currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setIsEditing(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setIsEditing(false);
    dispatch(clearCurrentUser());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = { name, email };
    
    try {
      if (isEditing && currentUser) {
        await dispatch(updateUser(currentUser._id, userData));
      } else {
        await dispatch(createUser(userData));
      }
      resetForm();
    } catch (err) {
      // Error is already handled in the action and stored in Redux state
      console.log("Operation failed");
    }
  };

  const handleEdit = (user) => {
    dispatch(setCurrentUser(user));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(id));
      } catch (err) {
        // Error is already handled in the action and stored in Redux state
        console.log("Delete failed");
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit User" : "User Registration"}
      </h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : isEditing ? "Update User" : "Create User"}
          </button>
          
          {isEditing && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <h2 className="text-xl font-bold mb-4">Users List:</h2>
      
      {loading && users.length === 0 && <div>Loading...</div>}
      
      {users.length === 0 && !loading ? (
        <p>No users found</p>
      ) : (
        <table className="min-w-full bg-white border rounded text-black">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">Name</th>
              <th className="border-b p-2 text-left">Email</th>
              <th className="border-b p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={loading ? "opacity-50" : ""}>
                <td className="border-b p-2">{user.name}</td>
                <td className="border-b p-2">{user.email}</td>
                <td className="border-b p-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}