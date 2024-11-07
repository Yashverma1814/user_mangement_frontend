// // https://nest-user-api-practice-project.onrender.com/user

"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import DeleteUser from '@/components/Deleting';
import LoadingUser from '@/components/Loading';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://nest-user-api-practice-project.onrender.com/user');
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error('Failed to fetch users');
    }
  };

  const deleteUser = async (id) => {
    setIsDeleting(true);
    await axios.delete(`https://nest-user-api-practice-project.onrender.com/user/${id}`);
    queryClient.invalidateQueries(["user"]);
    setIsDeleting(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation(deleteUser);

  // if (isLoading || isDeleting) return <p className="text-center text-xl text-gray-600">Loading...</p>;
  if (isDeleting) return <DeleteUser />;
  if (isLoading) return <LoadingUser />;
  if (error) return <p className="text-center text-xl text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Users List</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Sno.</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Place</th>
              <th className="py-2 px-4 text-left">Expertise</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.place}</td>
                <td className="py-2 px-4">{user.expertise}</td>
                <td className="py-2 px-4">
                  <Link href={`/users/${user._id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(deleteUser(user._id))}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
