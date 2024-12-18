// https://nest-user-api-practice-project.onrender.com/user

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import DeleteUser from "@/components/Deleting";
import LoadingUser from "@/components/Loading";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [bloodGroup, setBloodGroup] = useState("");
  const [expertise, setExpertise] = useState("");
  const [department, setDepartment] = useState("");
  const [isEmployed, setIsEmployed] = useState("");
  const [isMarried, setIsMarried] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName,setUserName] = useState(false)
  const [userNameFt,setUserNameFt] = useState("")
  const [seVal,setseVal] = useState("")

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://nest-user-api-practice-project.onrender.com/user`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    setIsDeleting(true);
    await axios.delete(
      `https://nest-user-api-practice-project.onrender.com/user/${id}`
    );
    queryClient.invalidateQueries(["user"]);
    setIsDeleting(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation(deleteUser);

  const filteredData = data
    ? data.filter((user) => {
        return (
          (bloodGroup ? user.bloodGrp === bloodGroup : true) &&
          (expertise
            ? user.expertise.toLowerCase().startsWith(expertise.toLowerCase())
            : true) &&
          (department ? user.department === department : true) &&
          (isEmployed !== "" ? user.employed === isEmployed : true) &&
          (isMarried !== "" ? user.married === isMarried : true) &&
          (lastname
            ? user.name
                .trim()
                .split(" ")
                [user.name.trim().split(" ").length - 1].toLowerCase()
                .startsWith(lastname.toLowerCase())
            : true) &&
          (firstName
            ? user.name
                .trim()
                .split(" ")[0]
                .toLowerCase()
                .startsWith(firstName.toLowerCase())
            : true)&&
          (userNameFt=="sw"?(user.name.toLowerCase().startsWith(seVal.toLowerCase())):userNameFt=="ew"?(user.name.toLowerCase().endsWith(seVal.toLowerCase())):true)
        );
      })
    : [];

  const totalPages = Math.ceil(filteredData.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredData
    .reverse()
    .slice(startIndex, startIndex + usersPerPage);
  console.log(isEmployed, isMarried);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isDeleting) return <DeleteUser />;
  if (isLoading) return <LoadingUser />;
  if (error)
    return (
      <p className="text-center text-xl text-red-600">Error: {error.message}</p>
    );

  return (
    <div className="container mx-auto p-6 flex">
      <aside className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filter Users</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Expertise</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              value={userName}
              onChange={() => setUserName(!userName)}
              className="p-2 border rounded mr-2"
            />
            <label className="text-sm font-medium">User Name</label>
          </div>
        </div>
        {userName?
        <div className="mb-4">
          <select
            value={userNameFt}
            onChange={(e) => setUserNameFt(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select fiilter type</option>
            <option value="sw">start with</option>
            <option value="ew">end with</option>
          </select>
          <input
            type="text"
            value={seVal}
            onChange={(e) => setseVal(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>:""
        }
        <div className="mb-4">
          <label className="block text-sm font-medium">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Last name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="tech">tech</option>
            <option value="nontech">nontech</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Employed</label>
          <select
            value={isEmployed}
            onChange={(e) =>
              setIsEmployed(
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : ""
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Married</label>
          <select
            value={isMarried}
            onChange={(e) =>
              setIsMarried(
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : ""
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          onClick={() => {
            setBloodGroup("");
            setExpertise("");
            setDepartment("");
            setIsEmployed("");
            setIsMarried("");
            setFirstName("");
            setLastname("");
            setUserName(false)
            setUserNameFt("");
            setseVal("")
          }}
          className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          Clear Filters
        </button>
      </aside>

      <div className="w-3/4 pl-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Users List
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Sno.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Place</th>
                <th className="py-2 px-4 text-left">Expertise</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">Nationality</th>
                <th className="py-2 px-4 text-left">Blood Group</th>
                <th className="py-2 px-4 text-left">Employed</th>
                <th className="py-2 px-4 text-left">Married</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{startIndex + index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.place}</td>
                  <td className="py-2 px-4">{user.expertise}</td>
                  <td className="py-2 px-4">{user.department}</td>
                  <td className="py-2 px-4">{user.nationality}</td>
                  <td className="py-2 px-4">{user.bloodGrp}</td>
                  <td className="py-2 px-4">{user.employed ? "Yes" : "No"}</td>
                  <td className="py-2 px-4">{user.married ? "Yes" : "No"}</td>
                  <td className="py-2 px-4">
                    <Link href={`/users/${user._id}`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors mr-2">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        deleteMutation.mutate(deleteUser(user._id))
                      }
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
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
