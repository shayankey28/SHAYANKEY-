"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check their role in the database
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
        router.push("/admin"); // Admins go straight to the admin panel
      } else {
        router.push("/dashboard"); // Customers go to the customer dashboard
      }

    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dceff0] flex items-center justify-center p-6">
      <div className="bg-[#fffdf7] p-10 rounded-sm shadow-xl w-full max-w-md border border-[#d3e1df]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-[#173948] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#557071]">Log in to manage your laundry</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173948] text-white p-3 font-semibold mt-4 hover:bg-[#0f2631] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Demo Login Button */}
        <div className="mt-8 pt-6 border-t border-[#d3e1df]">
          <p className="text-center text-xs text-[#557071] mb-3 uppercase tracking-wider font-bold">For Hackathon Judges</p>
          <button
            onClick={async () => {
              try {
                // IMPORTANT: Change this email to your actual admin email!
                const userCredential = await signInWithEmailAndPassword(auth, "adminfinal@gmail.com", "password123");
                const userDocRef = doc(db, "users", userCredential.user.uid);
                const userDocSnap = await getDoc(userDocRef);
                
                if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
                  router.push("/admin");
                } else {
                  router.push("/dashboard");
                }
              } catch (e) {
                alert("Demo account not created yet. Please sign up first.");
              }
            }}
            className="w-full bg-[#bce3d7] text-[#173948] p-3 text-sm font-bold hover:bg-[#a5d6c7] transition"
          >
            One-Click Demo Login
          </button>
        </div>

        <p className="text-center text-sm text-[#557071] mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-[#173948] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}