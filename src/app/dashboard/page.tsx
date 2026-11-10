"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/client";
import { db } from "@/lib/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Check if this user is an admin (just so we can show a "Back to Admin" button)
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
          setIsAdmin(true);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "orders"), where("customerId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      fetchedOrders.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setOrders(fetchedOrders);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffdf7]">
        <p className="text-[#173948] font-semibold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] font-sans">
      {/* Top Navigation */}
      <nav className="bg-[#173948] text-white px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="h-8 w-8 border-2 border-white rounded-full flex items-center justify-center font-serif text-sm font-bold">
            S
          </div>
          <span className="font-bold tracking-widest text-sm">SHAYANKEY</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline text-[#bce3d7]">{user?.email}</span>
          
          {/* Show Admin link only if the user is an admin */}
          {isAdmin && (
            <Link href="/admin" className="text-[#bce3d7] hover:text-white transition font-bold">
              Admin Panel
            </Link>
          )}

          <button 
            onClick={handleLogout}
            className="bg-transparent border border-white/30 hover:bg-white/10 px-4 py-2 rounded-sm transition"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-[#173948] mb-2">Welcome back!</h1>
          <p className="text-[#557071]">Here is an overview of your laundry orders.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Action Card */}
          <div className="bg-[#bce3d7] p-8 rounded-sm col-span-1 flex flex-col justify-between min-h-[200px]">
            <div>
              <h2 className="font-serif text-2xl text-[#173948] mb-2">Need a pickup?</h2>
              <p className="text-sm text-[#173948]/70 mb-6">Schedule a new laundry pickup in seconds.</p>
            </div>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-[#173948] text-white py-3 px-6 text-sm font-semibold self-start hover:bg-[#0f2631] transition"
            >
              Book New Pickup
            </button>
          </div>

          {/* Real Orders List */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {orders.length === 0 ? (
              <div className="border border-[#d3e1df] p-8 rounded-sm flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="text-4xl mb-4 text-[#d3e1df]">🧺</div>
                <h3 className="font-serif text-xl text-[#173948] mb-1">No active orders</h3>
                <p className="text-sm text-[#557071]">When you book a pickup, your order status will appear here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border border-[#d3e1df] p-6 rounded-sm bg-white flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-serif text-xl text-[#173948]">{order.service}</h3>
                    <p className="text-sm text-[#557071]">{order.items} items • {order.totalPrice} KES</p>
                    {order.notes && <p className="text-xs text-[#557071] mt-1 italic">"{order.notes}"</p>}
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-[#dceff0] text-[#173948] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                      {order.status.replace("_", " ")}
                    </span>
                    <a 
                      href={`/track/${order.id}`} 
                      target="_blank" 
                      className="text-xs text-[#497879] underline hover:text-[#173948] font-medium"
                    >
                      Track Order ↗
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}