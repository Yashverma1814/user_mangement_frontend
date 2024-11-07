

"use client";

import { useState } from "react";
import axios from "axios";
import CreatingUser from "@/components/Creating";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    place: "",
    expertise:"",
    phone: "",
    email: "",
    department: "",
    religion: "",
    language: "",
    dob: null,
    pincode: ""
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      console.log(user)
      await axios.post("https://nest-user-api-practice-project.onrender.com/user", user);
      alert("User created successfully!");
      setIsCreating(false);
      setUser({
        name: "",
        place: "",
        expertise:"",
        phone: "",
        email: "",
        department: "",
        religion: "",
        language: "",
        dob: null,
        pincode: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
      setIsCreating(false);
    }
  };

  if (isCreating) return <CreatingUser />;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create New User</h2>
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
        <label htmlFor="DOB">Date of Birth</label>
        <div className="w-full border-gray-300 rounded-md px-4 py-2">
          <DatePicker
            selected={user.dob}
            onChange={handleDateChange}
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Create User
        </button>
      </form>
    </div>
  );
}


