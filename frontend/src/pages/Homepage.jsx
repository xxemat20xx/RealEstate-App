import { usePropertyStore } from "../store/usePropertyStore";
import { useState, useEffect, useMemo  } from "react";
import PropertySkeleton from "../components/Admin-Components/PropertySkeleton";
import PropertyCard from "../components/Homepage-Component/PropertyCard";
import PropertDetailsModal from "../components/Admin-Components/PropertDetailsModal";
import Hero from "../components/Homepage-Component/Hero";
import CurratedCollection from "../components/Homepage-Component/CurratedCollection";
import MarketStats from "../components/Homepage-Component/MarketStats";
import CompanyStory from "../components/Homepage-Component/CompanyStory";


const Homepage = () => {
  const { fetchProperties, properties, isLoading } = usePropertyStore();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({
    query: '',
    listingType: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
   }, []);
  
const filteredProperties = useMemo(() => {
  if (!Array.isArray(properties)) return [];

  return properties.filter((property) => {
    const location = property.address?.toLowerCase() || "";
    const title = property.title?.toLowerCase() || "";
    const listingType = property.listingType?.toLowerCase() || "";

    const query = filters.query?.toLowerCase() || "";
    const filterListingType = filters.listingType?.toLowerCase() || "";

    const matchesQuery =
      location.includes(query) || title.includes(query);

    const matchesListingType =
      !filterListingType || listingType.includes(filterListingType);

    return matchesQuery && matchesListingType;
  });
}, [properties, filters]);

  return (
    <>
    <main className="flex-1 flex flex-col">
        <Hero
          query={filters.query}
          onSearch={(value) =>
            setFilters((prev) => ({ ...prev, query: value }))
          }
        />
        {/* filter bar */}
      <div className={`bg-white border-b border-slate-200 sm:top-0 z-40 transition-all
                      ${scrolled
                      ? 'py-4 shadow-sm opacity-100'
                      : 'py-0 h-0 opacity-0 overflow-hidden'}`}>
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 px-6 sm:px-12 items-center justify-between">

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto ml-auto">
                <select 
                  className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold focus:outline-none border-r-8 border-transparent cursor-pointer"
                  value={filters.listingType}
                  onChange={(e) => setFilters({...filters, listingType: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="commercial">Commercial</option>
                </select>
                <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                  <button 
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all`}
                  >
                    Gallery
                  </button>
                </div>
        </div>
        </div>
      </div>
        {/* Content Area */}
               <div className="p-6 sm:p-12 max-w-[1600px] mx-auto w-full">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-600 mb-2">Portfolio Selection</h2>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold">Featured Global Listings</h3>
                        </div>
                        <p className="text-slate-400 text-sm hidden md:block">Showing {filteredProperties.length} hand-picked estates</p>
                       
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {isLoading ? (
                                 Array.from({ length: 8 }).map((_, i) => <PropertySkeleton key={i} />)
                            ) : (
                                filteredProperties.map(property => (
                                   <PropertyCard
                                        key={property._id}
                                        property={property}
                                        onClick={() => {
                                            setSelectedProperty(property);
                                        }}
                                    />
                                ))
                            )}
                         </div>
                </div>
          {/* Other Content */}
        
          <CurratedCollection />
          <MarketStats />
          <CompanyStory />
    </main>
    {/* OVERLAY */}
    {selectedProperty && (
        <PropertDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    )}
    </>
    
  );
};

export default Homepage;