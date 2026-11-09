import Navbar from "@/components/Navbar";
import Link from "next/link";
import SmartCareAdvisor from "@/components/SmartCareAdvisor";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-[#dceff0]">
          <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#497879] uppercase mb-4">
                Laundry &amp; Garment Care
              </p>
              <h1 className="font-serif text-6xl leading-[1.1] tracking-tight text-[#173948] mb-6">
                Fresh clothes.<br />
                <span className="text-[#ed9651] italic">More time for you.</span>
              </h1>
              <p className="text-[#40606c] leading-relaxed max-w-md mb-8">
                From everyday washing to special-care garments, SHAYANKEY ENTERPRISES
                brings thoughtful laundry service straight to your door at a very affordable price.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/login" className="bg-[#173948] text-white px-8 py-4 text-sm font-semibold flex items-center gap-3 hover:bg-[#0f2631] transition">
                  Schedule a pickup <span className="text-xl leading-none">&rarr;</span>
                </Link>
                <Link href="#services" className="text-sm font-semibold underline underline-offset-4 text-[#173948]">
                  Explore our services
                </Link>
              </div>
            </div>
            
            {/* Visual Placeholder */}
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute w-[350px] h-[350px] bg-[#f9c880] rounded-full top-0 right-0"></div>
              <div className="relative z-10 bg-white p-8 rounded-sm shadow-xl max-w-xs">
                <h3 className="font-serif text-2xl mb-2">We pick it up.</h3>
                <p className="text-sm text-gray-500 mb-6">We wash it. We fold it. We bring it back.</p>
                <div className="h-2 w-full bg-[#bce3d7] rounded-full mb-2"></div>
                <div className="h-2 w-3/4 bg-[#dceff0] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-end">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#497879] uppercase mb-4">Our Services</p>
              <h2 className="font-serif text-5xl leading-tight text-[#173948]">
                Care for every<br />kind of laundry.
              </h2>
            </div>
            <p className="text-[#557071] leading-relaxed max-w-sm">
              Choose the service that suits your day. We take care of the washing, pressing, and finishing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Wash & Fold", desc: "Everyday laundry washed, dried, folded, and returned ready for your drawer.", icon: "✦" },
              { title: "Dry Cleaning", desc: "Professional care for delicate fabrics, formalwear, suits, and special garments.", icon: "♧" },
              { title: "Ironing & Pressing", desc: "Crisp, polished garments for work, events, and whenever you want to look your best.", icon: "⌁" }
            ].map((service, i) => (
              <div key={i} className={`p-8 border border-[#d3e1df] min-h-[280px] flex flex-col ${i === 1 ? 'bg-[#bce3d7] border-[#bce3d7]' : 'bg-transparent'}`}>
                <div className="text-3xl text-[#ec9450] mb-6">{service.icon}</div>
                <h3 className="font-serif text-2xl mb-3 text-[#173948]">{service.title}</h3>
                <p className="text-sm text-[#496568] leading-relaxed mb-8">{service.desc}</p>
                <Link href="/login" className="mt-auto text-sm font-bold text-[#173948]">
                  Book this service &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Care Advisor Section */}
        <section className="bg-[#f5f5f5] py-24 px-6 border-t border-[#d3e1df]">
          <SmartCareAdvisor />
        </section>
      </main>

      {/* FIXED FOOTER */}
      <footer className="border-t border-[#d3e1df] py-8 text-center text-sm text-[#547071]">
        <p>&copy; 2026 SHAYANKEY ENTERPRISES. All rights reserved.</p>
      </footer>
    </div>
  );
}