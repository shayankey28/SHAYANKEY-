"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase/client";

export default function BookingForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [service, setService] = useState("Wash & Fold");
  const [items, setItems] = useState(5);
  const [notes, setNotes] = useState("");
  const [zone, setZone] = useState("under10"); // under10 or over10
  const [isExpress, setIsExpress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Base Pricing Logic
  let basePricePerItem = 150; 
  if (service === "Dry Cleaning") basePricePerItem = 300;
  if (service === "Ironing & Pressing") basePricePerItem = 100;
  if (service === "Duvets & Bedding") basePricePerItem = 400;
  if (service === "Shoe Cleaning") basePricePerItem = 150;
  if (service === "Curtain Cleaning") basePricePerItem = 400;
  if (service === "Suit & Blazer") basePricePerItem = 600;
  if (service === "Baby Clothes") basePricePerItem = 120;
  if (service === "Sports Gear") basePricePerItem = 250;
  if (service === "Stain Treatment") basePricePerItem = 200;
  if (service === "Wedding Dress") basePricePerItem = 600;

  // Calculate Express Fee
  let expressMultiplier = 1;
  if (isExpress) {
    expressMultiplier = zone === "under10" ? 1.25 : 1.50; // 25% or 50%
  }

  const finalPricePerItem = Math.round(basePricePerItem * expressMultiplier);
  const totalPrice = items * finalPricePerItem;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      // Construct the final service name so the admin sees the details
      const finalServiceName = isExpress 
        ? `${service} (Express - ${zone === "under10" ? "Under 10km" : "Over 10km"})` 
        : service;

      await addDoc(collection(db, "orders"), {
        customerId: auth.currentUser.uid,
        customerEmail: auth.currentUser.email,
        service: finalServiceName,
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
        setIsExpress(false);
        setZone("under10");
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
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
        onClick={onClose}
      />
      
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
                <option value="Curtain Cleaning">Curtain Cleaning</option>
                <option value="Suit & Blazer">Suit & Blazer</option>
                <option value="Baby Clothes">Baby Clothes</option>
                <option value="Sports Gear">Sports Gear</option>
                <option value="Stain Treatment">Stain Treatment</option>
                <option value="Wedding Dress">Wedding Dress</option>
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

            {/* EXPRESS SERVICE SECTION */}
            <div className="bg-[#dceff0] p-4 rounded-sm border border-[#bce3d7]">
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input 
                  type="checkbox" 
                  checked={isExpress} 
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="w-5 h-5 accent-[#173948]"
                />
                <span className="font-bold text-[#173948]">Rush my order (Express Service)</span>
              </label>

              {isExpress && (
                <div className="mt-2 animate-fadeIn">
                  <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Delivery Distance</label>
                  <select 
                    value={zone} 
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full p-2 border border-[#d3e1df] bg-white text-sm text-[#173948] focus:outline-none"
                  >
                    <option value="under10">Under 10km (+25% Fee)</option>
                    <option value="over10">Over 10km (+50% Fee)</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Special Instructions (Optional)</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g., Please use sensitive detergent"
                className="w-full p-3 border border-[#d3e1df] bg-white text-[#173948] focus:outline-none focus:border-[#173948] resize-none"
              />
            </div>

            <div className="bg-[#f5f5f5] p-4 border border-[#d3e1df] mt-2">
              <div className="flex justify-between items-center text-sm mb-1 text-[#557071]">
                <span>Base price</span>
                <span>{basePricePerItem} KES</span>
              </div>
              {isExpress && (
                <div className="flex justify-between items-center text-sm mb-1 text-[#ed9651] font-semibold">
                  <span>Express Fee ({zone === "under10" ? "+25%" : "+50%"})</span>
                  <span>+{finalPricePerItem - basePricePerItem} KES</span>
                </div>
              )}
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