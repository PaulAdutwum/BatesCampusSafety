"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";

// ** Instantiate GoogleAuthProvider **
const googleProvider = new GoogleAuthProvider();

// Styled Input Field
const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#881124]";

// Styled Button
const buttonStyle =
  "w-full py-3 bg-[#881124] text-white font-semibold rounded-lg hover:bg-[#a02234] transition duration-300";

// Styled Error Message
const errorStyle = "text-red-500 text-sm mt-2 text-center";

// ** Type definition for Firebase errors **
interface FirebaseAuthError extends Error {
  code?: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(""); // ✅ Specify types
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // ** Email/Password Login **
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // ✅ Redirect to Dashboard
    } catch (err) {
      const error = err as FirebaseAuthError; // ✅ Type assertion
      console.error("Login Error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  // ** Google Sign-In **
  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      router.push("/dashboard"); // ✅ Redirect to Dashboard
    } catch (err) {
      const error = err as FirebaseAuthError; // ✅ Type assertion
      console.error("Google Sign-In Error:", error.message);
      setError("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* 🔙 Back Button */}
        <Link
          href="/"
          className="flex items-center text-[#881124] hover:text-red-600 mb-4 transition duration-300"
        >
          <FaArrowLeft className="mr-2" /> Back to Homepage
        </Link>

        {/* 🔑 Login Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Login to Bobcat Express
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Enter your details below
        </p>

        {/* 🔒 Login Form */}
        <form onSubmit={handleLogin} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`${inputStyle} mt-4`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={errorStyle}>{error}</p>}
          <button type="submit" className={`${buttonStyle} mt-6`}>
            Login
          </button>
        </form>

        {/* 🔵 Google Sign-In */}
        <div className="flex items-center mt-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className={`${buttonStyle} mt-4 flex items-center justify-center`}
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>

        {/* 🆕 Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#881124] hover:text-red-600 transition duration-300"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-6 w-full text-center mt-12">
        <p className="text-sm">
          © {new Date().getFullYear()} Bobcat Express Shuttle. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
