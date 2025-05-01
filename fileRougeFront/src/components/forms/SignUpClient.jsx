import React, { useState } from "react";
import axios from "axios";

function SignUpFormClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    age: '',
    weight: '',
    height: '',
    race: ''
  });

  const [error, setError] = useState(""); 
  const [isFormVisible, setIsFormVisible] = useState(true); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async () => {
    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.name || !form.email || !form.password || !form.password_confirmation || !form.age || !form.weight || !form.height || !form.race) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup/client", form);

      // ✅ Store token and user info locally
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.client));

      console.log("Signup success:", response.data);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError("Signup failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  return (
    isFormVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
        <div className="bg-neutral-100 p-6 rounded-lg shadow-lg w-[90%] max-w-md border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="number"
            step="0.1"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="number"
            step="0.1"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="text"
            name="race"
            placeholder="Race"
            value={form.race}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <button
            onClick={handleSignUp}
            className="bg-black text-white px-4 py-2 rounded w-full hover:bg-red-700"
          >
            Sign Up
          </button>

          <button
            onClick={handleClose}
            className="mt-2 text-sm text-red-500 hover:underline block mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}

export default SignUpFormClient;
