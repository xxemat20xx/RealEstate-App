import React from 'react'
const collections = [
  {
    title: 'Coastal Retreats',
    count: 12,
    image: 'https://picsum.photos/seed/coastal/800/600',
  },
  {
    title: 'Urban Penthouses',
    count: 8,
    image: 'https://picsum.photos/seed/urban/800/600',
  },
  {
    title: 'Historic Manors',
    count: 5,
    image: 'https://picsum.photos/seed/historic/800/600',
  }
];

const CurratedCollection = () => {
  return (
    <div className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600 mb-2">Lifestyles</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold">Curated Collections</h3>
          </div>
          <button className="text-sm font-bold uppercase tracking-widest hover:text-amber-600 transition-colors hidden md:block">
            View All Collections
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, idx) => (
            <div key={idx} className="group relative h-96 rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{collection.count} Properties</p>
                <h4 className="text-white text-2xl font-serif font-bold">{collection.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurratedCollection