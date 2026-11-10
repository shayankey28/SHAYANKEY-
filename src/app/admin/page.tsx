"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase/client";
import { collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      // Check the database to see if this user is an admin
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
        // They are an admin, let them stay
      } else {
        // They are a customer, kick them back to their dashboard
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      fetchedOrders.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setOrders(fetchedOrders);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status !== "delivered").length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffdf7]">
        <p className="text-[#173948] font-semibold animate-pulse">Loading admin data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] font-sans">
      <nav className="bg-[#173948] text-white px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="h-8 w-8 border-2 border-white rounded-full flex items-center justify-center font-serif text-sm font-bold">
            S
          </div>
          <span className="font-bold tracking-widest text-sm">
            SHAYANKEY <span className="text-[#bce3d7] ml-2 font-normal text-xs uppercase tracking-wider">Admin</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-[#bce3d7] transition hidden md:inline">Customer View</Link>
          <button 
            onClick={handleLogout}
            className="bg-transparent border border-white/30 hover:bg-white/10 px-4 py-2 rounded-sm transition"
          >
            Log out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#173948] mb-2">Business Overview</h1>
          <p className="text-[#557071]">Manage your orders and track your business growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-[#d3e1df] p-6 rounded-sm shadow-sm">
            <p className="text-xs font-bold text-[#557071] uppercase tracking-wider mb-2">Total Revenue</p>
            <h2 className="font-serif text-4xl text-[#173948]">{totalRevenue.toLocaleString()} <span className="text-lg text-[#557071]">KES</span></h2>
          </div>
          <div className="bg-[#bce3d7] p-6 rounded-sm shadow-sm">
            <p className="text-xs font-bold text-[#173948]/70 uppercase tracking-wider mb-2">Active Orders</p>
            <h2 className="font-serif text-4xl text-[#173948]">{activeOrders}</h2>
          </div>
          <div className="bg-[#173948] text-white p-6 rounded-sm shadow-sm">
            <p className="text-xs font-bold text-[#bce3d7] uppercase tracking-wider mb-2">Total Orders (All Time)</p>
            <h2 className="font-serif text-4xl">{totalOrders}</h2>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-end">
          <h2 className="font-serif text-2xl text-[#173948]">Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="border border-[#d3e1df] p-12 text-center rounded-sm bg-white">
            <p className="text-[#557071]">No orders yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#d3e1df] rounded-sm overflow-x-auto shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#f5f5f5] text-[#173948] font-bold uppercase tracking-wider text-xs border-b border-[#d3e1df]">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d3e1df]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fffdf7] transition">
                    <td className="px-6 py-4 text-[#173948] font-medium">{order.customerEmail}</td>
                    <td className="px-6 py-4">{order.service}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4 font-semibold text-[#173948]">{order.totalPrice} KES</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
                        ${order.status === 'booked' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'picked_up' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'washing' ? 'bg-purple-100 text-purple-800' : ''}
                        ${order.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'delivered' ? 'bg-gray-200 text-gray-800' : ''}
                      `}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="border border-[#d3e1df] p-2 text-sm bg-white text-[#173948] focus:outline-none rounded-sm"
                      >
                        <option value="booked">Booked</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="washing">Washing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}