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
    expertise: "",
    phone: "",
    email: "",
    department: "",
    religion: "",
    language: "",
    dob: null,
    pincode: "",
    gender: "",
    nationality: "",
    aadhaarNo: "",
    address: "",
    bloodGrp: "",
    fatherName: "",
    motherName: "",
    employed: false,
    married: false,
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await axios.post(
        "https://nest-user-api-practice-project.onrender.com/user",
        user
      );
      alert("User created successfully!");
      setIsCreating(false);
      setUser({
        name: "",
        place: "",
        expertise: "",
        phone: "",
        email: "",
        department: "",
        religion: "",
        language: "",
        dob: null,
        pincode: "",
        gender: "",
        nationality: "",
        aadhaarNo: "",
        address: "",
        bloodGrp: "",
        fatherName: "",
        motherName: "",
        employed: false,
        married: false,
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
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Create New User
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Name, Place */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={user.place}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Expertise, Phone */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="expertise"
            placeholder="Expertise"
            value={user.expertise}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Email, Department */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
          <select
            name="department"
            value={user.department}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Select Department</option>
            <option value="tech">Tech</option>
            <option value="nontech">Non-Tech</option>
          </select>
        </div>

        {/* Gender (Radio Buttons) */}
        <div className="flex space-x-4">
          <label>Gender:</label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="others"
              onChange={handleChange}
            />{" "}
            Others
          </label>
        </div>

        {/* Nationality, Religion */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="nationality"
            value={user.nationality}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Select Nationality</option>
            <option value="indian">Indian</option>
            <option value="american">American</option>
            {/* Add more options as needed */}
          </select>
          <select
            name="religion"
            value={user.religion}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Select Religion</option>
            <option value="christianity">Christianity</option>
            <option value="islam">Islam</option>
            <option value="hinduism">Hinduism</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <select
              name="language"
              value={user.language}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>

          {/* Pincode Field */}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={user.pincode}
              onChange={handleChange}
              maxLength={6}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
        </div>
        {/* Aadhaar No (formatted), Blood Group */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="aadhaarNo"
              placeholder="Aadhaar No (xxxx xxxx xxxx)"
              value={user.aadhaarNo}
              maxLength={12}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
            <small className="text-xs text-gray-500">
              Enter carefully; this cannot be changed
            </small>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="A+"
                  onChange={handleChange}
                />
                <span>A+</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="B+"
                  onChange={handleChange}
                />
                <span>B+</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="A-"
                  onChange={handleChange}
                />
                <span>A-</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="B-"
                  onChange={handleChange}
                />
                <span>B-</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="AB+"
                  onChange={handleChange}
                />
                <span>AB+</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="AB-"
                  onChange={handleChange}
                />
                <span>AB-</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="O+"
                  onChange={handleChange}
                />
                <span>O+</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="bloodGrp"
                  value="O-"
                  onChange={handleChange}
                />
                <span>O-</span>
              </label>
            </div>
          </div>
        </div>

        {/* Father, Mother Name */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={user.fatherName}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={user.motherName}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Employed, Married (Toggle Switches) */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <span>Employed</span>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                name="employed"
                checked={user.employed}
                onChange={(e) =>
                  setUser({ ...user, employed: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition duration-300"></div>
              <div className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
            </div>
          </label>

          <label className="flex items-center space-x-2">
            <span>Married</span>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                name="married"
                checked={user.married}
                onChange={(e) =>
                  setUser({ ...user, married: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition duration-300"></div>
              <div className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Date of Birth Field */}
          <div className="grid grid-cols-1 gap-4">
            <label className="block text-gray-700">Date of Birth</label>
            <DatePicker
              selected={user.dob}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date of Birth"
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
