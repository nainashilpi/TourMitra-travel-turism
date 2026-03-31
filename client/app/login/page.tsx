"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
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
        `https://tourmitra-74s0.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        router.push("/"); // redirect after login
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-black relative overflow-hidden px-4">
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">

        {/* Image Section */}
        <div className="hidden md:block relative">
          <Image
            src="/login1.png" // add your image in public folder
            alt="login"
            fill
            className="object-cover"
          />
          
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-black relative overflow-hidden">
          <h1 className="text-3xl font-bold mb-2 text-white">
            Login
          </h1>
          <p className="text-white mb-6">
            Access your account and continue your journey 
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="Enter your email"
                className=" text-white w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
                placeholder="Enter your password "
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-white"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#ac9c68] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Login
            </button>

            {/* Extra Links */}
            <p className="text-sm text-gray-500 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-[#ac9c68] cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;