import React, { useState } from "react";

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
  
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState(""); 
  const [isFormVisible, setIsFormVisible] = useState(true); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
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
      // Simulated success for demo purposes
      console.log("Signup success:", form);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  return (
    isFormVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Sign Up</h2>

          {error && <p className="text-red-400 text-center mb-4 bg-gray-800 p-2 rounded">{error}</p>}

          {/* Profile Picture Upload Section */}
          <div className="mb-6 flex flex-col items-center">
            {previewUrl ? (
              <div className="mb-3 relative">
                <img 
                  src={previewUrl} 
                  alt="Profile preview" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                />
                <button 
                  onClick={() => {
                    setProfilePic(null);
                    setPreviewUrl('');
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-3 border border-gray-700">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            
            <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded text-gray-200 transition duration-300">
              {profilePic ? 'Change Picture' : 'Upload Picture'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />

              <input
                type="number"
                step="0.1"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                step="0.1"
                name="height"
                placeholder="Height (cm)"
                value={form.height}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />

              <input
                type="text"
                name="race"
                placeholder="Race"
                value={form.race}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="mt-6 bg-black text-gray-100 px-4 py-3 rounded w-full hover:bg-gray-800 border border-gray-700 font-medium transition duration-300"
          >
            Sign Up
          </button>

          <button
            onClick={handleClose}
            className="mt-4 text-sm text-gray-400 hover:text-gray-200 block mx-auto transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}

export default SignUpFormClient;