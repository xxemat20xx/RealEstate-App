import { useState, useMemo } from "react"
import { 
    BathIcon, 
    Bed, 
    Building, 
    Car, 
    ChevronLeft, 
    House, 
    MapPin, 
    Users, 
    Expand,
    ChartNoAxesColumnIncreasing,
    Play,
    Check,
    Mail,
} from "lucide-react";
import MapView from "./MapView"
import InquiryModal from "./InquiryForm"

const PropertDetailsModal = ({ property, onClose }) => {
 const [activeImage, setActiveImage] = useState(0);
 const [showInquiry, setShowInquiry] = useState(false);
 const pricePerSqft = Math.round(property.price / property.sqft);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6 bg-slate-900/80 backdrop-blur-md">
        {/* Inquiry Form Modal Overlay */}
         {showInquiry && (
            <InquiryModal property={property} onClose={() => setShowInquiry(false)} />
         )}
         {/* Hero Section */}
          <div className="bg-white w-full max-w-7xl h-full sm:h-auto sm:max-h-[95vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="relative h-[40vh] sm:h-[500px] flex-shrink-0">
                <img 
                    src={property.images[activeImage]} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/30 backdrop-blur-xl text-white p-3 rounded-full transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute top-6 right-6 flex flex-wrap justify-end gap-3">
                    {property.virtualTourUrl && (
                        <a 
                            href={property.virtualTourUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-amber-600 hover:bg-amber-500 shadow-lg text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            3D Virtual Tour
                        </a>
                    )}
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`${(property.listingType === 'sale' ? 'bg-amber-600' : 'bg-emerald-600')} text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-sm shadow-lg`}>
                                {property.listingType}
                            </span>
                            <span className="bg-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-sm backdrop-blur-md">
                               {property.unitType}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">{property.title}</h1>
                        <p className="text-lg opacity-90 mt-2 flex items-center gap-2">
                            <MapPin size={20}/>
                            {property.address}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm uppercase tracking-widest opacity-60 mb-1">
                            {property.listingType === 'rent' ? 'Monthly Lease' : 'Asking Price'}
                        </p>
                        <p className="text-4xl sm:text-5xl font-bold font-serif text-amber-500">
                            ${property.price.toLocaleString()}
                            {property.listingType === 'rent' && <span className="text-xl font-normal text-white/60 ml-1">/mo</span>}
                        </p>
                    </div>
                </div>
            </div>
            {/* Main Content Body */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 lg:divide-x divide-slate-100">
                     {/* Left Content Column */}
                     <div className="flex-1 p-8 sm:p-12 space-y-16">
                         {/* Image Navigation */}

                         <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                            {property.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'ring-4 ring-amber-600 ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                            ))}
                         </div>
                         {/* Quick Stats Grid */}
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-y border-slate-100">
                            {property.listingType !== 'commercial' ? (
                                <>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <Bed size={22}/>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Bedrooms</p>
                                        <p className="text-xl font-bold">{property.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <BathIcon size={22}/>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Bathrooms</p>
                                        <p className="text-xl font-bold">{property.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <Car size={22}/>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Garages</p>
                                        <p className="text-xl font-bold">{property.parking}</p>
                                    </div>
                                </div>
                                </>
                                ) : (
                                <>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                            <Building size={22}/>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Offices</p>
                                            <p className="text-xl font-bold">Premium</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                            <Users size={22}/>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Capacity</p>
                                            <p className="text-xl font-bold">50+</p>
                                        </div>
                                        </div>
                                    </div>
                                </>
                            )}
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                    <Expand size={22}/>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Area</p>
                                    <p className="text-xl font-bold">{property.sqft.toLocaleString()} <span className="text-xs font-normal">Sqft</span></p>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                   <ChartNoAxesColumnIncreasing size={22}/>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Valuation</p>
                                    <p className="text-xl font-bold">${pricePerSqft.toLocaleString()}<span className="text-xs font-normal opacity-50 ml-0.5">/ft</span></p>
                                </div>
                             </div>
                         </div>
                         {/* Virtual Tour */}
                        {property.virtualTourUrl && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Virtual Tour</h3>
                            <div className="relative h-96 group rounded-[2rem] overflow-hidden bg-slate-900 shadow-xl">
                                   <img src={property.images[1] || property.images[0]} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-1000" />
                                   <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                                        <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
                                            <Play size={22}/>
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">3D Virtual Walkthrough</h4>
                                        <p className="text-slate-300 text-sm max-w-sm mb-8">Take a private digital tour of every room and corner from the comfort of your screen.</p>
                                        <a 
                                            href={property.virtualTourUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all shadow-xl"
                                        >
                                            Start Virtual Tour
                                        </a>
                                   </div>
                            </div>
                        
                        </div>
                        )}

                        {/* Detailed Specifications Table */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold">Property Specifications</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Year Built</span>
                                    <span className="font-bold">{property.yearBuilt || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Lot Size</span>
                                    <span className="font-bold">{property.lotSize || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Parking</span>
                                    <span className="font-bold">{property.parking || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Property Type</span>
                                    <span className="font-bold">{property.unitType.toUpperCase() || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Category</span>
                                    <span className="font-bold text-amber-700">{property.listingType.toUpperCase() || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 py-3">
                                    <span className="text-slate-500">Status</span>
                                    <span className="font-bold text-green-600">Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Description & Amenities */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                 <h3 className="text-2xl font-serif font-bold">
                                    {(property.listingType === 'commercial' ? 'rent' : 'sale').toUpperCase()}
                                 </h3>
                                  <p className="text-slate-600 leading-loose text-lg font-light">{property.description}</p>
                            </div>

                            <div className="flex flex-col space-y-4">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Check size={22} className="text-amber-700"/>
                                        <span className="text-slate-600">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map view */}
                        <div className="space-y-8">
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-serif font-bold">Location & Neighborhood</h3>
                            </div>
                            <div className="h-96 rounded-[2rem] overflow-hidden border-8 border-slate-50 shadow-inner">
                                <MapView url={property.mapUrl} />
                            </div>
                        </div>

                         {/* Right Sidebar - Sticky Contact */}
                         <div className="w-full lg:w-[450px] bg-slate-50/50 p-8 sm:p-12">
                                <div className="sticky top-12 space-y-8">
                                    {/* advisor card */}
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Exclusive Advisor</h4>
                                        <div className="flex items-center gap-5 mb-10">
                                            {/* <img src={property.agent.image} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-lg" /> */}
                                            <div>
                                            <h5 className="text-xl font-serif font-bold">{property.agent || 'AGENT'}</h5>
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Global Property Partner</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                        <button 
                                        onClick={() => setShowInquiry(true)}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Mail size={20} />
                                            <span>Schedule a Viewing</span>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                         </div>
                     </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default PropertDetailsModal