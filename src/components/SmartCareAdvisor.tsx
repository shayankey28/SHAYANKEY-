"use client";

import { useState } from "react";

export default function SmartCareAdvisor() {
  const [fabric, setFabric] = useState("");
  const [stain, setStain] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!fabric || !stain) return;

    // Rules-based logic
    let recommendation = "";
    let tip = "";
    let service = "Wash & Fold";

    if (fabric === "delicate" || fabric === "wool") {
      service = "Dry Cleaning";
      recommendation = "We recommend Dry Cleaning for this item.";
      tip = "Delicate fabrics like silk and wool can shrink or warp in water. Our dry cleaning process safely cleans them without water.";
    } else if (stain === "oil" || stain === "wine") {
      service = "Dry Cleaning";
      recommendation = "We recommend Dry Cleaning to safely remove this stain.";
      tip = "Oil and wine stains set into fabric quickly. Professional dry cleaning uses specialized solvents to lift them without damaging the color.";
    } else if (stain === "mud" || stain === "food") {
      service = "Wash & Fold";
      recommendation = "Our standard Wash & Fold will handle this perfectly.";
      tip = "We use premium detergents and targeted pre-treatment to remove food and mud stains during the wash cycle.";
    } else {
      recommendation = "Standard Wash & Fold is perfect.";
      tip = "Your items will be washed, dried, and folded with care.";
    }

    setResult({ recommendation, tip, service });
  };

  return (
    <div className="bg-white border border-[#d3e1df] p-8 md:p-12 rounded-sm shadow-xl max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-[#173948] mb-2">Smart Care Advisor</h2>
        <p className="text-sm text-[#557071]">Not sure how to wash it? Tell us about it.</p>
      </div>

      {!result ? (
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">What is the fabric?</label>
            <div className="grid grid-cols-2 gap-3">
              {['cotton', 'denim', 'delicate', 'wool'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFabric(f)}
                  className={`p-3 border text-sm capitalize transition ${fabric === f ? 'border-[#173948] bg-[#173948] text-white' : 'border-[#d3e1df] hover:border-[#173948]'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#173948] mb-2 uppercase tracking-wide">Any stains?</label>
            <div className="grid grid-cols-2 gap-3">
              {['none', 'mud', 'oil', 'wine'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStain(s)}
                  className={`p-3 border text-sm capitalize transition ${stain === s ? 'border-[#173948] bg-[#173948] text-white' : 'border-[#d3e1df] hover:border-[#173948]'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!fabric || !stain}
            className="w-full bg-[#ed9651] text-white p-4 font-bold mt-4 hover:bg-[#d88443] transition disabled:opacity-50"
          >
            Get Recommendation
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-[#bce3d7] p-6 rounded-sm mb-6">
            <p className="text-sm font-bold text-[#173948] uppercase tracking-wider mb-2">Our Recommendation</p>
            <h3 className="font-serif text-2xl text-[#173948] mb-2">{result.service}</h3>
            <p className="text-sm text-[#173948]/80 mb-4">{result.recommendation}</p>
            <p className="text-xs text-[#173948]/70 italic border-t border-[#173948]/10 pt-4">{result.tip}</p>
          </div>
          <button
            onClick={() => { setResult(null); setFabric(""); setStain(""); }}
            className="text-sm text-[#557071] underline hover:text-[#173948]"
          >
            Try another item
          </button>
        </div>
      )}
    </div>
  );
}