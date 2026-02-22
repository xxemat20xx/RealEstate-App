
const MarketStats = () => {
  return (
        <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500 mb-4">Global Reach</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Unrivaled Access to the World's Finest Estates
            </h3>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-lg text-lg">
              Our private network connects discerning buyers with extraordinary properties across 12 countries. We provide unparalleled market intelligence and discreet advisory services.
            </p>
            <button className="border border-white/20 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all">
              Read Our Market Report
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-4xl font-serif font-bold text-amber-500 mb-2">$2.4B+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Sales Volume</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-4xl font-serif font-bold text-amber-500 mb-2">12</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Countries</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-4xl font-serif font-bold text-amber-500 mb-2">450+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Global Advisors</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-4xl font-serif font-bold text-amber-500 mb-2">98%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Client Retention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketStats