import React from 'react'

const CompanyStory = () => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/company/800/1000" 
              alt="Real Estate Headquarters"
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply"></div>
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 rounded-2xl max-w-xs shadow-xl">
              <p className="font-serif text-xl font-bold text-slate-900 leading-snug">
                "Redefining luxury real estate advisory since 1998."
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600 mb-2">Our Heritage</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-slate-900">The Real Estate Difference</h3>
            </div>
            <p className="text-slate-600 leading-loose text-lg">
              Founded on the principles of discretion, integrity, and unparalleled market expertise, Real Estate has spent over two decades curating the world's most significant properties for an exclusive clientele.
            </p>
            <p className="text-slate-600 leading-loose text-lg">
              Our private advisory team operates exclusively at the highest echelons of the market, providing a white-glove service that extends far beyond the transaction. From architectural provenance to future valuation modeling, we offer a comprehensive approach to legacy wealth in real estate.
            </p>
            <div className="pt-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-lg">
                Meet Our Leadership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyStory