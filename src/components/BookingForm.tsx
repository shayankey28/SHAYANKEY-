"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase/client";

export default function BookingForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [service, setService] = useState("Wash & Fold");
  const [items, setItems] = useState(5);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pricing Logic matching the 6 services
  let pricePerItem = 150; // Default for Wash & Fold
  if (service === "Dry Cleaning") pricePerItem = 300;
  if (service === "Ironing & Pressing") pricePerItem = 100;
  if (service === "Duvets & Bedding") pricePerItem = 800;
  if (service === "Shoe Cleaning") pricePerItem = 500;
  if (service === "Express Service") pricePerItem = 250; // Base 150 + 100 express fee

  const totalPrice = items * pricePerItem;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        customerId: auth.currentUser.uid,
        customerEmail: auth.currentUser.email,
        service,
        items: Number(items),
        totalPrice,
        notes,
        status: "booked",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setNotes("");
        setItems(5);
        setService("Wash & Fold");
      }, 2000);
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to book pickup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Slide-out Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#fffdf7] z-50 shadow-2xl p-8 overflow-y-auto transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl text-[#173948]">New Pickup</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-black">&times;</button>
        </div>

        {success ? (
          <div className="bg-[#bce3d7] text-[#173948] p-6 text-center rounded-sm">
            <p className="text-2xl mb-2">🎉</p>
            <h3 className="font-bold text-lg mb-1">Pickup Scheduled!</h3>
            <p className="text-sm">We will see you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Service Type</label>
              <select 
                value={service} 
                onChange={(e) => setService(e.target.value)}
                className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948]"
              >
                <option value="Wash & Fold">Wash & Fold</option>
                <option value="Dry Cleaning">Dry Cleaning</option>
                <option value="Ironing & Pressing">Ironing & Pressing</option>
                <option value="Duvets & Bedding">Duvets & Bedding</option>
                <option value="Shoe Cleaning">Shoe Cleaning</option>
                <option value="Express Service">Express Service</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Number of Items</label>
              <input 
                type="number" 
                min="1" 
                max="50"
                value={items} 
                onChange={(e) => setItems(Number(e.target.value))}
                className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Special Instructions (Optional)</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g., Please use sensitive detergent"
                className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948] resize-none"
              />
            </div>

            <div className="bg-[#f5f5f5] p-4 border border-[#d3e1df] mt-2">
              <div className="flex justify-between items-center text-sm mb-1 text-[#557071]">
                <span>Price per item</span>
                <span>{pricePerItem} KES</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-[#173948] mt-2 pt-2 border-t border-[#d3e1df]">
                <span>Total Estimate</span>
                <span>{totalPrice} KES</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#173948] text-white p-4 font-semibold mt-4 hover:bg-[#0f2631] transition disabled:opacity-50"
            >
              {loading ? "Scheduling..." : "Confirm Pickup"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}