import { Search } from "lucide-react"


const Hero = ({ onSearch, query }) => {


  return (
    <>
        <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
            <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Estate" 
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50"></div>
            </div>
            
            {/* content */}
            <div className="relative z-10 max-w-5xl px-6 text-center text-white">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-2xl">
                Find Your Legacy.
                </h1>
                <p className="text-lg md:text-xl text-slate-100 mb-12 max-w-2xl mx-auto font-light tracking-wide opacity-90">
                Discover a curated collection of the world's most exceptional properties, 
                where architectural mastery meets unparalleled lifestyle.
                </p>
            {/* Integrated search bar */}
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20">
                <div className="relative flex items-center">
                    <Search size={22} className="absolute left-6 w-6 h-6 text-slate-300"/>
                    <input 
                    type="text" 
                    placeholder="Search by city, neighborhood, or lifestyle..."
                    className="w-full bg-white text-slate-900 rounded-xl px-16 py-5 text-lg focus:outline-none shadow-inner"
                    value={query}
                    onChange={(e) => onSearch(e.target.value)}
                    />
                <button className="absolute right-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95">
                Explore
                </button>
                </div>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs font-bold tracking-[0.3em] uppercase text-white/60">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                    Laguna
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                    Cavite
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                    Marikina
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                    Pampanga
                </div>
            </div>
            </div>
            {/* scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
            </div>
        </div>
        
    </>
   
  )
}

export default Hero