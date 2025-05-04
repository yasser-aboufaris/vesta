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
  const [successData, setSuccessData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async () => {
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (Object.values(form).some(val => !val)) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup/client", form);

      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.client));

      setSuccessData({
        token: response.data.token,
        user: response.data.client
      });

      setIsFormVisible(false); // hides form
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError("Signup failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsFormVisible(true);
    setSuccessData(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-50/80 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md border border-green-200">
        <h2 className="text-xl font-bold mb-4 text-center text-green-700">Create Your Account</h2>

        {error && <p className="text-red-500 text-center mb-4 bg-red-50 p-2 rounded">{error}</p>}

        {isFormVisible ? (
          <>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={form.name} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="password" 
              name="password_confirmation" 
              placeholder="Confirm Password" 
              value={form.password_confirmation} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="number" 
              name="age" 
              placeholder="Age" 
              value={form.age} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="number" 
              step="0.1" 
              name="weight" 
              placeholder="Weight (kg)" 
              value={form.weight} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="number" 
              step="0.1" 
              name="height" 
              placeholder="Height (cm)" 
              value={form.height} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />
            <input 
              type="text" 
              name="race" 
              placeholder="Race" 
              value={form.race} 
              onChange={handleChange} 
              className="w-full mb-3 p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none" 
            />

            <button 
              onClick={handleSignUp} 
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              Sign Up
            </button>
          </>
        ) : (
          successData && (
            <div className="text-sm text-gray-700 bg-green-50 p-4 rounded-lg">
              <p className="mb-2 font-medium text-green-700">Signup Successful!</p>
              <p><strong>Token:</strong> {successData.token}</p>
              <p className="mt-2 font-medium text-green-700">User:</p>
              <pre className="bg-white p-2 rounded overflow-x-auto text-xs border border-green-100">
                {JSON.stringify(successData.user, null, 2)}
              </pre>
            </div>
          )
        )}

        <button onClick={handleClose} className="mt-4 text-sm text-green-600 hover:text-green-800 hover:underline block mx-auto">
          Close
        </button>
      </div>
    </div>
  );
}

export default SignUpFormClient;