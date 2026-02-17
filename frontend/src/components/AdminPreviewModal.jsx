import React from 'react'
import MapView from './MapView'

const AdminPreviewModal = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12 overflow-hidden">
        <div className="bg-white w-full max-w-6xl h-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
            <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Staff Asset Preview</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Verifying: {property.title}</p>
            </div>
            <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 p-3 rounded-full text-slate-500 hover:text-slate-900 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Left: Content and Specs */}
                    <div className="p-10 space-y-12">
                    <div className="flex items-center gap-6">
                        <img src={property.images[0]} className="w-32 h-32 rounded-3xl object-cover shadow-xl" />
                        <div>
                        <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">{property.listingType}</span>
                        <h3 className="text-3xl font-serif font-bold mt-2 text-slate-900">{property.title}</h3>
                        <p className="text-slate-500 font-medium">{property.location}</p>
                        <p className="text-2xl font-bold text-amber-600 mt-2">${property.price.toLocaleString()}</p>
                        </div>
                    </div>
                    {/* INFO GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-slate-50">
                        <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Beds</p>
                        <p className="text-lg font-bold">{property.bedrooms || 'N/A'}</p>
                        </div>
                        <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bathrooms</p>
                        <p className="text-lg font-bold">{property.bathrooms || 'N/A'}</p>
                        </div>
                        <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sqft</p>
                         <p className="text-lg font-bold">{property.sqft.toLocaleString()}</p>
                        </div>
                        <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                         <p className="text-lg font-bold">{property.listingType.toUpperCase()}</p>
                        </div>
                        <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                         <p className="text-lg font-bold">{property.status.toUpperCase()}</p>
                        </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Description</h4>
                        <p className="text-slate-600 leading-relaxed">{property.description}</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Amenities</h4>    
                        <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity, index) => (
                                <span key={index} className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{amenity}</span>
                            ))}
                        </div>
                    </div> 
                    </div>
                    {/* RIGHT: MAP */}
                    <div className="bg-slate-50 border-l border-slate-100 flex flex-col p-10 space-y-8">
                        <div className="space-y-4 flex-1">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Map</h4>
                                <div className="flex gap-8 mb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Location</span>
                                    <code className="bg-white px-3 py-1 rounded-md text-slate-900 font-mono text-xs border border-slate-200">{property.address}</code>
                                </div>
                                {/* MAP VIEW */}
                                <div className="relative h-[400px] w-full">
                                    <MapView url={property.mapUrl} />
                                    <div className="absolute right-4 top-4 z-[401] bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 max-w-[200px]">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Verified Location</p>
                                        <p className="text-[10px] text-slate-900 leading-tight truncate">{property.address}</p>
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

export default AdminPreviewModal