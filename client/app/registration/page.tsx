"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://tourmitra-74s0.onrender.com/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setUser({ username: "", email: "", phone: "", password: "" });
        router.push("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-black  px-4">
      
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Image Section */}
        <div className="hidden md:block relative">
          <Image
            src="/login1.png"
            alt="registration"
            fill
            className="object-cover"
          />

          {/* Overlay */}
          
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-black ">
          
          <h1 className="text-3xl font-bold mb-2 text-white">
            Create Account
          </h1>
          <p className="text-gray-500 mb-6">
            Start your journey with us 
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter your username "
                className="w-full px-4 py-2 border  text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email "
                className="w-full px-4 py-2 border text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter your phone number "
                className="w-full px-4 py-2 border rounded-lg text-white  focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Create a password "
                className="w-full px-4 py-2 border  text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#ac9c68] text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Register Now
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-[#ac9c68] cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;