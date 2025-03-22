"use client";

import { useState, useEffect } from "react";
import { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser 
} from "@/services/userServices";

export default function UserCRUD() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      if (editingId) {
        // Update existing user
        const updatedUser = await updateUser(editingId, { name, email });
        setUsers(users.map(user => user._id === editingId ? updatedUser : user));
        setEditingId(null);
      } else {
        // Create new user
        const newUser = await createUser({ name, email });
        setUsers([...users, newUser]);
      }
      // Reset form
      setName("");
      setEmail("");
    } catch (error) {
      setError(editingId ? "Failed to update user." : "Failed to create user.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    setIsLoading(true);
    setError("");
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      setError("Failed to delete user.");
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setName("");
    setEmail("");
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">{editingId ? "Edit User" : "Create User"}</h2>
        
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : editingId ? "Update User" : "Create User"}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={cancelEdit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Users List</h2>
        
        {isLoading && !users.length ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
    </div>
  );
}