import { usePropertyStore } from "../store/usePropertyStore";
import { useState, useEffect } from "react";
import PropertySkeleton from "../components/PropertySkeleton";
import PropertyCard from "../components/PropertyCard";

import Hero from "../components/Hero";
const Homepage = () => {
  const { fetchProperties, properties, isLoading } = usePropertyStore();

  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({
    query: '',
    type: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

const filteredProperties = properties.filter((property) => {
  const location = property.location?.toLowerCase() || '';
  const type = property.type?.toLowerCase() || '';

  const query = filters.query?.toLowerCase() || '';
  const filterType = filters.type?.toLowerCase() || '';

  const matchesQuery = location.includes(query);
  const matchesType = type.includes(filterType);

  return matchesQuery && matchesType;
});
console.log(filteredProperties);
  return (
    <main className="flex-1 flex flex-col">
      {viewMode === 'grid' && <Hero />}

        {/* filter bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 px-6 sm:px-12 items-center justify-between">
            {viewMode === 'split' && (
            <input
                type="text"
                value={filters.query}
                onChange={(e) =>
                setFilters({ ...filters, query: e.target.value })
                }
            />
            )}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto ml-auto">
                <select 
                  className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold focus:outline-none border-r-8 border-transparent cursor-pointer"
                  value={filters.listingLabel}
                  onChange={(e) => setFilters({...filters, listingLabel: e.target.value})}
                >
                  <option value="All">All Categories</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Gallery
                  </button>
                </div>
        </div>
        </div>
      </div>
        {/* Content Area */}
            {viewMode === 'grid' ? (
                <div className="p-6 sm:p-12 max-w-[1600px] mx-auto w-full">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600 mb-2">Portfolio Selection</h2>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold">Featured Global Listings</h3>
                        </div>
                        <p className="text-slate-400 text-sm hidden md:block">Showing {filteredProperties.length} hand-picked estates</p>
                       
                    </div>
                </div>
            ) : (<></>)}
    </main>
  );
};

export default Homepage;