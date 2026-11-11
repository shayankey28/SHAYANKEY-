import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { title: "Wash & Fold", price: "150 KES / item", desc: "Everyday laundry washed, dried, and neatly folded.", image: "/images/service-fold.jpg" },
    { title: "Dry Cleaning", price: "300 KES / item", desc: "Professional solvent cleaning for delicate fabrics and suits.", image: "/images/service-dry.jpg" },
    { title: "Ironing & Pressing", price: "100 KES / item", desc: "Crisp, professional pressing for shirts, trousers, and dresses.", image: "/images/service-iron.jpg" },
    { title: "Duvets & Bedding", price: "800 KES / item", desc: "Deep cleaning for bulky comforters, duvets, and blankets.", image: "/images/service-duvet.jpg" },
    { title: "Shoe Cleaning", price: "500 KES / pair", desc: "Restore your sneakers and leather shoes with our specialized process.", image: "/images/service-shoe.jpg" },
    { title: "Express Service", price: "+50% Fee", desc: "Need it urgently? Get your clothes back within 24 hours.", image: "/images/service-wash.jpg" },
    { title: "Curtain Cleaning", price: "400 KES / panel", desc: "Remove dust and allergens from heavy household curtains.", image: "/images/curtain.jpg" },
    { title: "Suit & Blazer", price: "600 KES / item", desc: "Gentle dry cleaning to preserve the shape of your formalwear.", image: "/images/suit.jpg" },
    { title: "Baby Clothes", price: "120 KES / item", desc: "Hypoallergenic washing to protect sensitive baby skin.", image: "/images/baby.jpg" },
    { title: "Sports Gear", price: "250 KES / item", desc: "Deep clean to remove sweat and odours from activewear.", image: "/images/sports.jpg" },
    { title: "Stain Treatment", price: "200 KES / item", desc: "Targeted pre-treatment for tough stains like wine, oil, or grass.", image: "/images/stain.jpg" },
    { title: "Wedding Dress", price: "1500 KES / item", desc: "Specialized, delicate cleaning and preservation for bridal gowns.", image: "/images/suit.jpg" } 
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fffdf7]">
      <Navbar />

      <main className="flex-1 w-full py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold tracking-widest text-[#497879] uppercase mb-4">Our Price List</p>
            <h1 className="font-serif text-5xl text-[#173948] mb-6">Everything we clean.</h1>
            <p className="text-[#557071] leading-relaxed text-lg">
              Transparent pricing for every garment. Choose your service, see the price, and schedule a pickup.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="flex flex-col h-full bg-white rounded-sm overflow-hidden border border-[#d3e1df] hover:shadow-xl transition-all duration-300 group">
                
                {/* Image Header */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Price Tag overlay */}
                  <div className="absolute top-4 right-4 bg-[#173948] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                    {service.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl mb-3 text-[#173948]">{service.title}</h3>
                  <p className="text-sm text-[#496568] leading-relaxed mb-8 flex-1">{service.desc}</p>
                  
                  <Link href="/login" className="text-sm font-bold text-[#173948] flex items-center gap-2 group-hover:text-[#ed9651] transition-colors">
                    Book this service <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <footer className="border-t border-[#d3e1df] py-8 text-center text-sm text-[#557071] bg-[#fffdf7]">
        <p>&copy; 2026 SHAYANKEY ENTERPRISES. All rights reserved.</p>
      </footer>
    </div>
  );
}