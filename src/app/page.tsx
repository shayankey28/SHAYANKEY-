import Navbar from "@/components/Navbar";
import Link from "next/link";
import SmartCareAdvisor from "@/components/SmartCareAdvisor";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fffdf7]">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* HERO SECTION - Solid Background (No Images) */}
        <section className="relative w-full py-32 flex items-center bg-[#173948]">
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Text */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#bce3d7] uppercase mb-4">
                Laundry &amp; Garment Care
              </p>
              <h1 className="font-serif text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-8">
                Fresh clothes.<br />
                <span className="text-[#ed9651] italic">More time for you.</span>
              </h1>
              <p className="text-[#dceff0] text-lg leading-relaxed max-w-lg mb-10">
                From everyday washing to special-care garments, SHAYANKEY ENTERPRISES
                brings thoughtful laundry service straight to your door at a very affordable price.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link href="/login" className="bg-[#ed9651] text-white px-8 py-4 text-sm font-semibold flex items-center gap-3 hover:bg-[#d88443] transition w-full sm:w-auto justify-center">
                  Schedule a pickup <span className="text-xl leading-none">&rarr;</span>
                </Link>
                <Link href="#services" className="text-sm font-semibold underline underline-offset-4 text-white text-center w-full sm:w-auto hover:text-[#bce3d7] transition">
                  Explore our services
                </Link>
              </div>
            </div>

            {/* Right Visual (Pure CSS) */}
            <div className="hidden lg:flex justify-center relative">
              <div className="w-80 h-96 bg-[#dceff0] rounded-t-full rounded-b-sm border-4 border-[#bce3d7] flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Abstract Laundry Bubbles */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-32 right-8 w-10 h-10 bg-white rounded-full opacity-40"></div>
                <div className="absolute bottom-16 left-16 w-24 h-24 bg-white rounded-full opacity-30"></div>
                <span className="text-7xl relative z-10">🧺</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="w-full bg-white py-24 border-b border-[#d3e1df]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold tracking-widest text-[#497879] uppercase mb-4">Our Services</p>
              <h2 className="font-serif text-5xl text-[#173948] mb-6">Care for every kind of laundry.</h2>
              <p className="text-[#557071] leading-relaxed">
                Choose the service that suits your day. We take care of the washing, pressing, and finishing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Wash & Fold", desc: "Everyday laundry washed, dried, folded, and returned ready for your drawer.", icon: "✦" },
                { title: "Dry Cleaning", desc: "Professional care for delicate fabrics, formalwear, suits, and special garments.", icon: "♧" },
                { title: "Ironing & Pressing", desc: "Crisp, polished garments for work, events, and whenever you want to look your best.", icon: "⌁" },
                { title: "Duvets & Bedding", desc: "Deep cleaning for bulky items like duvets, comforters, and blankets.", icon: "🛏" },
                { title: "Shoe Cleaning", desc: "Restore your sneakers and leather shoes with our specialized cleaning process.", icon: "👟" },
                { title: "Express Service", desc: "Need it urgently? Get your clothes back within 24 hours.", icon: "⚡" }
              ].map((service, i) => (
                <div key={i} className="p-8 border border-[#d3e1df] hover:shadow-xl transition-all duration-300 bg-[#fffdf7] flex flex-col h-full rounded-sm group">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="font-serif text-2xl mb-3 text-[#173948]">{service.title}</h3>
                  <p className="text-sm text-[#496568] leading-relaxed mb-8 flex-1">{service.desc}</p>
                  <Link href="/login" className="text-sm font-bold text-[#173948] flex items-center gap-2 group-hover:text-[#ed9651] transition-colors">
                    Book this service <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION (Replaces the photo gallery) */}
        <section className="w-full bg-[#f5f5f5] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-5xl text-[#173948]">How it works.</h2>
              <p className="text-[#557071] mt-4 max-w-xl mx-auto">Three simple steps to fresh, clean clothes.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Book a Pickup", desc: "Choose your service and schedule a pickup right from your phone." },
                { step: "02", title: "We Clean It", desc: "Our team washes, dries, and folds your clothes with premium care." },
                { step: "03", title: "Fresh Delivery", desc: "We deliver your clothes back to your door, fresh and ready to wear." }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[#bce3d7] text-[#173948] rounded-full flex items-center justify-center font-serif text-2xl mb-6 shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-2xl text-[#173948] mb-3">{item.title}</h3>
                  <p className="text-[#557071] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Care Advisor Section */}
        <section className="bg-white py-24 px-6 border-t border-[#d3e1df]">
          <SmartCareAdvisor />
        </section>
      </main>

      <footer className="border-t border-[#d3e1df] py-8 text-center text-sm text-[#557071] bg-[#fffdf7]">
        <p>&copy; 2026 SHAYANKEY ENTERPRISES. All rights reserved.</p>
      </footer>
    </div>
  );
}