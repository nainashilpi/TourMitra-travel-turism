"use client";

import { useState } from "react";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-black  px-4">
      <main className="w-full max-w-4xl bg-gradient-to-r from-slate-900 via-blue-950 to-black rounded-2xl shadow-lg p-6 sm:p-10">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-5">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={contact.username}
              onChange={handleInput}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
              value={contact.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={contact.message}
              onChange={handleInput}
              placeholder="Write your message..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#ac9c68] text-black font-semibold py-3 rounded-lg hover:bg-blue-900 transition"
          >
            Send Message
          </button>
        </form>

      </main>
    </section>
  );
};

export default Contact;