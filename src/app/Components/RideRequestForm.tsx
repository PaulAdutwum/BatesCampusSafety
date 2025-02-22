"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaCarSide, FaCheckCircle } from "react-icons/fa";

const destinations = [
  "Dorms",
  "Walmart",
  "Target",
  "CVS",
  "CMMC Hospital",
  "Tree Street",
  "Flagship Cinema",
  "Connors Elementary School",
  "Lewiston High School",
  "Auburn Mall",
];

export default function RideRequestForm() {
  const [destination, setDestination] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const origin = "Bates College";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setSuccessMessage(
      `✅ Your ride request to ${destination} has been submitted successfully!`
    );

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setDestination(""); // Reset form
    }, 5000);
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Ride Request Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 border border-gray-300 rounded-lg shadow-lg p-6 bg-white transition duration-300 hover:shadow-xl"
      >
        {/* 🔹 Origin Field (Static) */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm w-full border border-gray-300">
          <FaMapMarkerAlt className="text-[#881124] mr-3" />
          <input
            type="text"
            value={origin}
            disabled
            className="w-full bg-transparent outline-none text-gray-700 cursor-not-allowed font-semibold"
          />
        </div>

        {/* 🔹 Destination Field (Dropdown) */}
        <div className="relative w-full">
          <label className="block text-gray-600 font-semibold mb-1">
            Select Destination:
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#881124] transition duration-300"
          >
            <option value="" disabled>
              Choose your destination
            </option>
            {destinations.map((dest, index) => (
              <option key={index} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Submit Button */}
        <button
          type="submit"
          disabled={!destination}
          className={`w-full flex justify-center items-center space-x-2 px-4 py-3 rounded-lg text-white font-semibold text-lg transition duration-300
              ${
                destination
                  ? "bg-blue-600 hover:bg-blue-800 shadow-md"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
        >
          <FaCarSide />
          <span>Submit Request</span>
        </button>
      </form>

      {/* ✅ Success Message */}
      {successMessage && (
        <div className="flex items-center space-x-2 p-3 bg-green-100 text-green-700 rounded-lg shadow-md border border-green-500 transition duration-300">
          <FaCheckCircle className="text-green-600" />
          <p className="text-sm font-semibold">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
