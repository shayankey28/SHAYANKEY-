import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-[#fffdf7] border-b border-[#d3e1df]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 border-2 border-[#173948] rounded-full flex items-center justify-center font-serif text-xl font-bold">
            S
          </div>
          <div className="flex flex-col text-sm font-bold leading-tight tracking-wider text-[#173948]">
            SHAYANKEY
            <span className="text-[9px] tracking-[2.5px] text-[#497879]">ENTERPRISES</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#173948]">
          <Link href="/services" className="hover:text-[#497879] transition">Services</Link>
          <Link href="#how-it-works" className="hover:text-[#497879] transition">How it works</Link>
          <Link href="#about" className="hover:text-[#497879] transition">About us</Link>
          <Link href="/login" className="bg-[#173948] text-white px-5 py-2.5 rounded-sm hover:bg-[#0f2631] transition">
            Book a pickup
          </Link>
        </nav>
      </div>
    </header>
  );
}