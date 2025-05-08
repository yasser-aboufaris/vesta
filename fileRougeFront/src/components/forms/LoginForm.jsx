import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        form
      );
      const { token, user } = data;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/fyp");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Login failed. Check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-green-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Log In to Your Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300 font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
