import Navbar from "@/components/Navbar";
import Link from "next/link";
import SmartCareAdvisor from "@/components/SmartCareAdvisor";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fffdf7]">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* HERO SECTION - Full Width with Background Image */}
        <section className="relative w-full h-[85vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Laundry Background" 
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay to make text readable */}
            <div className="absolute inset-0 bg-[#173948]/70 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
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

        {/* GALLERY SECTION - Uses the exact filenames from your screenshot */}
        <section className="w-full bg-[#173948] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#bce3d7] uppercase mb-4">Our Process</p>
                <h2 className="font-serif text-5xl text-white">See the magic happen.</h2>
              </div>
              <p className="text-[#bce3d7] max-w-md mt-4 md:mt-0 text-sm">
                We treat every garment with the utmost care. From washing to folding, we handle your clothes like our own.
              </p>
            </div>
            
            {/* Masonry-style Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              <div className="col-span-2 row-span-2 rounded-sm overflow-hidden relative group">
                <img src="/images/basket.jpg" alt="Folded Clothes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/machines.jpg" alt="Washing Machines" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/laundromat.jpg" alt="Laundromat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 rounded-sm overflow-hidden relative group">
                <img src="/images/drying.jpg" alt="Drying Clothes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/gallery-1.jpg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/gallery-2.jpg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 rounded-sm overflow-hidden relative group">
                <img src="/images/bubbles.jpg" alt="Soap Bubbles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/jeans-line.jpg" alt="Jeans" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/clips.jpg" alt="Pegs" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 rounded-sm overflow-hidden relative group">
                <img src="/images/window.jpg" alt="Window" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/gallery-3.jpg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/gallery-4.jpg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/gallery-5.jpg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-sm overflow-hidden relative group">
                <img src="/images/heart-clip.jpg" alt="Heart Peg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Smart Care Advisor Section */}
        <section className="bg-[#f5f5f5] py-24 px-6 border-t border-[#d3e1df]">
          <SmartCareAdvisor />
        </section>
      </main>

      <footer className="border-t border-[#d3e1df] py-8 text-center text-sm text-[#557071] bg-[#fffdf7]">
        <p>&copy; 2026 SHAYANKEY ENTERPRISES. All rights reserved.</p>
      </footer>
    </div>
  );
}