"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard on success
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

        <p className="text-center text-sm text-[#557071] mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-[#173948] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}