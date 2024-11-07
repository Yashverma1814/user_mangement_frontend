
"use client";

import { useState } from "react";
import axios from "axios";
import CreatingUser from "@/components/Creating";

export default function CreateUser() {
  const [user, setUser] = useState({ name: "", place: "", expertise: "" });
  const [isCreating,setIsCreating] = useState(false)

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true)
      await axios.post("https://nest-user-api-practice-project.onrender.com/user", user);
      alert("User created successfully!");
      setIsCreating(false)
      setUser({ name: "", place: "", expertise: "" })
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  if(isCreating) return <CreatingUser />

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create New User</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2"/>
        <input type="text" name="place" placeholder="Place" value={user.place} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2"/>
        <input type="text" name="expertise" placeholder="Expertise" value={user.expertise} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2"/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Create User</button>
      </form>
    </div>
  );
}
