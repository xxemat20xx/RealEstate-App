import { useState, useEffect } from "react"

const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center px-6 sm:px-12 justify-between ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm h-16 sm:h-20' : 'bg-transparent h-24 sm:h-32 text-white'
        }`}>
            <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif font-bold italic text-2xl shadow-lg transition-colors ${
                scrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}>R</div>
            <span className="font-serif text-2xl font-bold tracking-tight hidden sm:block">RealEstate</span>
            </div>
            <div className={`hidden lg:flex items-center gap-10 text-xs font-bold tracking-[0.2em] uppercase ${
            scrolled ? 'text-slate-500' : 'text-white/70'
            }`}>
                <button className="hover:text-amber-500 transition-colors border-b-2 border-transparent hover:border-amber-500 pb-1">Portfolio</button>
                <button className="hover:text-amber-500 transition-colors border-b-2 border-transparent hover:border-amber-500 pb-1">About</button>
                <button className="hover:text-amber-500 transition-colors border-b-2 border-transparent hover:border-amber-500 pb-1">Contact</button>
                <button className="hover:text-amber-500 transition-colors border-b-2 border-transparent hover:border-amber-500 pb-1">Admin Portal</button>
            </div>
            <div className="flex items-center gap-4">
            <button className={`text-sm font-bold transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'
            }`}>Log In</button>
            <button className="bg-amber-600 text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-amber-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 shadow-xl">
                Register
            </button>
            </div>
        </nav>
        {children}
    </>
  )
}

export default Navbar