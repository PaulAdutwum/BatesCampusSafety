"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#881124] text-white py-6 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Bates Logo and Name */}
        <div className="flex items-center space-x-3">
          <Image
            src="/bateslogow.png"
            alt="Bates College Logo"
            width={100}
            height={50}
            priority
            className="drop-shadow-lg"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="https://www.bates.edu/campus-safety/"
            className="font-semibold text-lg hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            href="https://www.bates.edu/campus-safety/bobcat-express-2/#accessible-support-shuttle"
            className="font-semibold text-lg hover:text-gray-300 transition duration-300"
          >
            Our Services
          </Link>
          <Link
            href="https://www.bates.edu/campus-safety/emergency-preparedness/emergency-phone-numbers/"
            className="font-semibold text-lg hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Navigation Drawer (Fixed and Functional) */}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#881124] text-white flex flex-col items-center justify-center space-y-6 text-lg font-semibold transition-all duration-500 md:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          height: "30vh", // adjust the height to your liking
          overflowY: "auto", // add this to enable scrolling
          backdropFilter: "blur(10px)", // add this to blur the background
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
        >
          <FaTimes />
        </button>

        <Link
          href="https://www.bates.edu/campus-safety/"
          className="hover:text-gray-300 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="https://www.bates.edu/campus-safety/bobcat-express-2/#accessible-support-shuttle"
          className="hover:text-gray-300 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Our Services
        </Link>
        <Link
          href="https://www.bates.edu/campus-safety/emergency-preparedness/emergency-phone-numbers/"
          className="hover:text-gray-300 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
