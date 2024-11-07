"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingUserUpdate from '@/components/LoadingDataForUpdation';

export default function UpdateUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", place: "", expertise: "" });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    if (id) {
      setLoadingData(true)
      axios.get(`https://nest-user-api-practice-project.onrender.com/user/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error("Error fetching user:", error));
      setLoadingData(false)
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://nest-user-api-practice-project.onrender.com/user/${id}`, user);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <LoadingUserUpdate />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Update User</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={user.place}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          name="expertise"
          placeholder="Expertise"
          value={user.expertise}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
}
