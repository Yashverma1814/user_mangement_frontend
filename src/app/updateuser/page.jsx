"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const fetchUser = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axios.get(
    `https://nest-user-api-practice-project.onrender.com/user/${id}`
  );
  return data;
};

const updateUser = async ({ id, userData }) => {
  const { data } = await axios.put(
    `https://nest-user-api-practice-project.onrender.com/user/${id}`,
    userData
  );
  return data;
};

export default function UpdateUserPage() {
  const router = useRouter(); 
  const queryClient = useQueryClient();
  const [user, setUser] = useState({ name: "", place: "", expertise: "" });
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    if (router.query.id) {
      console.log("ID from query:", router.query.id); 
      setUserId(router.query.id);
    }
  }, [router.query]);

  const { data, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled: !!userId, 
    onSuccess: (data) => {
      setUser(data); 
    },
  });
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]); 
      alert("User updated successfully!");
      router.push("/"); 
    },
    onError: (error) => {
      alert("Failed to update user.");
      console.error("Update error:", error);
    },
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.name && user.place && user.expertise) {
      mutation.mutate({ id: userId, userData: user });
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Update User
      </h2>

      {isError && <p className="text-red-600">{error.message}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
