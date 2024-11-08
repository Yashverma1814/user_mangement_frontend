// "use client";

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import LoadingUserUpdate from '@/components/LoadingDataForUpdation';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function UpdateUserPage() {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     name: "",
//     place: "",
//     expertise: "",
//     phone: "",
//     email: "",
//     department: "",
//     religion: "",
//     language: "",
//     dob: null,
//     pincode: "",
//     gender:"",
//     nationality:"",
//     aadhaarNo:"",
//     address:"",
//     bloodGrp:"",
//     fatherName:"",
//     motherName:"",
//     employed:"",
//     married:"",
//   });
//   const [loading, setLoading] = useState(false);
//   const [loadingData, setLoadingData] = useState(false);

//   useEffect(() => {
//     if (id) {
//       setLoadingData(true);
//       axios.get(`https://nest-user-api-practice-project.onrender.com/user/${id}`)
//         .then(response => {
//           setUser({
//             ...response.data,
//             dob: response.data.dob ? new Date(response.data.dob) : null
//           });
//           setLoadingData(false);
//         })
//         .catch(error => {
//           console.error("Error fetching user:", error);
//           setLoadingData(false);
//         });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (date) => {
//     setUser({ ...user, dob: date });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.put(`https://nest-user-api-practice-project.onrender.com/user/${id}`, {
//         ...user,
//         dob: user.dob ? user.dob.toISOString() : null
//       });
//       alert("User updated successfully");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Failed to update user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingData) return <LoadingUserUpdate />;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Update User</h1>
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={user.name}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <input
//           type="text"
//           name="place"
//           placeholder="Place"
//           value={user.place}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <input
//           type="text"
//           name="expertise"
//           placeholder="Expertise"
//           value={user.expertise}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={user.phone}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={user.email}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <select
//           name="department"
//           value={user.department}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         >
//           <option value="">Select Department</option>
//           <option value="tech">Tech</option>
//           <option value="nontech">Non-Tech</option>
//         </select>
//         <select
//           name="religion"
//           value={user.religion}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         >
//           <option value="">Select Religion</option>
//           <option value="christianity">Christianity</option>
//           <option value="islam">Islam</option>
//           <option value="hinduism">Hinduism</option>
//           <option value="buddhism">Buddhism</option>
//           <option value="sikhism">Sikhism</option>
//           <option value="judaism">Judaism</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           name="language"
//           value={user.language}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         >
//           <option value="">Select Language</option>
//           <option value="english">English</option>
//           <option value="spanish">Spanish</option>
//           <option value="french">French</option>
//           <option value="german">German</option>
//           <option value="mandarin">Mandarin</option>
//           <option value="hindi">Hindi</option>
//           <option value="other">Other</option>
//         </select>
//         <div className="w-full border-gray-300 rounded-md px-4 py-2">
//           <DatePicker
//             selected={user.dob}
//             onChange={handleDateChange}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Date of Birth"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <input
//           type="text"
//           name="pincode"
//           placeholder="Pincode"
//           value={user.pincode}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md px-4 py-2"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           {loading ? "Updating..." : "Update User"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingUserUpdate from "@/components/LoadingDataForUpdation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (id) {
      setLoadingData(true);
      axios
        .get(`https://nest-user-api-practice-project.onrender.com/user/${id}`)
        .then((response) => {
          setUser({
            ...response.data,
            dob: response.data.dob ? new Date(response.data.dob) : null,
          });
          setLoadingData(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoadingData(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `https://nest-user-api-practice-project.onrender.com/user/${id}`,
        {
          ...user,
          dob: user.dob ? user.dob.toISOString() : null,
        }
      );
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
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Update User
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Name, Place, and Expertise */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="">Place</label>
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
        </div>

        {/* Expertise, Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Expertise</label>
            <input
              type="text"
              name="expertise"
              placeholder="Expertise"
              value={user.expertise}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="">Phone</label>
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
        </div>

        {/* Aadhaar No (Read-only) */}
        <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block font-semibold mb-1">Aadhaar No:</label>
          <div className="w-full border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-700 cursor-not-allowed">
            {user.aadhaarNo || "N/A"}
          </div>
          <small className="text-gray-500">
            Aadhaar Number cannot be changed.
          </small>
        </div>

        {/* Blood Group (Read-only) */}
        <div className="w-full">
          <label className="block font-semibold mb-1">Blood Group:</label>
          <div className="w-full border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-700 cursor-not-allowed">
            {user.bloodGrp || "N/A"}
          </div>
          <small className="text-gray-500">
            Blood Group cannot be changed.
          </small>
        </div>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Date of Birth:</label>
            <DatePicker
              selected={user.dob}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date of Birth"
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="">Nationality</label>
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
          </div>
        </div>
        {/* Email, Department */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="">Department</label>
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
        </div>

        {/* Religion, Language */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Religion</label>
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
          <div>
            <label htmlFor="">Language</label>
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
        </div>

        {/* Pincode, Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={user.pincode}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
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
            <label htmlFor=""></label>
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
        </div>

        {/* Nationality */}

        {/* Father and Mother Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Father Name</label>
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={user.fatherName}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="">
              <label htmlFor="">Mother Name</label>
            </label>
            <input
              type="text"
              name="motherNa me"
              placeholder="Mother's Name"
              value={user.motherName}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Employment and Marital Status */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Address */}
        <div className="w-full">
          <textarea
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-4 py-2"
            rows="3"
          />
        </div>

        {/* Other fields like Address, Gender, Department, etc */}
        {/* ... (include all other fields like nationality, email, etc., similar to the create form) ... */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
}
