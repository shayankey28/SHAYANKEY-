"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard on success
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dceff0] flex items-center justify-center p-6">
      <div className="bg-[#fffdf7] p-10 rounded-sm shadow-xl w-full max-w-md border border-[#d3e1df]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-[#173948] mb-2">Create Account</h1>
          <p className="text-sm text-[#557071]">Join SHAYANKEY today</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
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
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173948] text-white p-3 font-semibold mt-4 hover:bg-[#0f2631] transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#557071] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#173948] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}