"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = onSnapshot(doc(db, "orders", orderId), (docSnap) => {
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fffdf7]">Loading tracker...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#fffdf7] text-red-600">Order not found. Check your link.</div>;

  // Progress steps
  const steps = ["booked", "picked_up", "washing", "ready", "delivered"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-[#dceff0] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="mb-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-2 mb-2">
          <div className="h-8 w-8 border-2 border-[#173948] rounded-full flex items-center justify-center font-serif text-sm font-bold text-[#173948]">
            S
          </div>
          <span className="font-bold tracking-widest text-[#173948]">SHAYANKEY</span>
        </Link>
        <h1 className="font-serif text-3xl text-[#173948]">Track Your Laundry</h1>
        <p className="text-sm text-[#557071] mt-1">Order #{order.id.slice(0, 6).toUpperCase()}</p>
      </div>

      <div className="bg-[#fffdf7] p-8 md:p-12 rounded-sm shadow-xl w-full max-w-lg border border-[#d3e1df]">
        
        {/* Status Timeline */}
        <div className="relative">
          {/* The vertical line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#d3e1df] -z-10"></div>

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step} className="flex items-center gap-6">
                  {/* Circle */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 transition-colors
                    ${isCompleted ? 'bg-[#173948] border-[#173948] text-white' : 'bg-white border-[#d3e1df] text-transparent'}
                  `}>
                    ✓
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className={`font-bold capitalize ${isCurrent ? 'text-[#173948] text-lg' : 'text-[#557071]'}`}>
                      {step.replace("_", " ")}
                    </h3>
                    {isCurrent && <p className="text-xs text-[#ed9651] font-semibold uppercase tracking-wider mt-1">Current Status</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#d3e1df] text-sm text-[#557071]">
          <p className="flex justify-between mb-2"><span>Service:</span> <strong className="text-[#173948]">{order.service}</strong></p>
          <p className="flex justify-between mb-2"><span>Items:</span> <strong className="text-[#173948]">{order.items}</strong></p>
          <p className="flex justify-between mb-2"><span>Total:</span> <strong className="text-[#173948]">{order.totalPrice} KES</strong></p>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-[#557071] text-center max-w-xs">
        This is a live tracking link. You can save this page or share it with anyone.
      </p>
    </div>
  );
}