

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingUserUpdate from '@/components/LoadingDataForUpdation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function UpdateUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    place: "",
    expertise: "",
    phone: "",
    email: "",
    department: "",
    religion: "",
    language: "",
    dob: null,
    pincode: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (id) {
      setLoadingData(true);
      axios.get(`https://nest-user-api-practice-project.onrender.com/user/${id}`)
        .then(response => {
          setUser({
            ...response.data,
            dob: response.data.dob ? new Date(response.data.dob) : null
          });
          setLoadingData(false);
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          setLoadingData(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://nest-user-api-practice-project.onrender.com/user/${id}`, {
        ...user,
        dob: user.dob ? user.dob.toISOString() : null
      });
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
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        />
        <select
          name="department"
          value={user.department}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Select Department</option>
          <option value="tech">Tech</option>
          <option value="nontech">Non-Tech</option>
        </select>
        <select
          name="religion"
          value={user.religion}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Select Religion</option>
          <option value="christianity">Christianity</option>
          <option value="islam">Islam</option>
          <option value="hinduism">Hinduism</option>
          <option value="buddhism">Buddhism</option>
          <option value="sikhism">Sikhism</option>
          <option value="judaism">Judaism</option>
          <option value="other">Other</option>
        </select>
        <select
          name="language"
          value={user.language}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="mandarin">Mandarin</option>
          <option value="hindi">Hindi</option>
          <option value="other">Other</option>
        </select>
        <div className="w-full border-gray-300 rounded-md px-4 py-2">
          <DatePicker
            selected={user.dob}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date of Birth"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={user.pincode}
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
