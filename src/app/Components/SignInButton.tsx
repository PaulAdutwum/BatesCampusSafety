"use client";

import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInButton() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle Google Sign-In
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="text-center mt-6">
      {/* Always show the button to sign in or access dashboard */}
      {user ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-green-700 transition duration-300"
          onClick={() => router.push("/dashboard")}
        >
          <FaSignInAlt className="text-lg" />
          <span className="text-lg font-semibold">Go to Dashboard</span>
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-blue-700 transition duration-300"
          onClick={handleSignIn}
        >
          <FaSignInAlt className="text-lg" />
          <span className="text-lg font-semibold">Sign in with Google</span>
        </motion.button>
      )}
    </div>
  );
}
