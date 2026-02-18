import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, X, Bed, Bath, Car, LandPlot, CalendarCheck, Trash, SquaresUnite } from 'lucide-react';

const PropertyForm = ( { property, onSave, onCancel } ) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    lotSize: '',
    sqft: '',
    address: '',
    listingType: 'sale',
    unitType: 'house',
    yearBuilt: '',
    status: 'available',
    amenities: [],
    images: [],
    imageIds: [],
    mapUrl: '',
    virtualTourUrl: '',
  });

  const clearFormData = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      parking: '',
      lotSize: '',
      sqft: '',
      address: '',
      listingType: 'sale',
      unitType: 'house',
      yearBuilt: '',
      status: 'available',
      amenities: [],
      images: [],
      imageIds: [],
      mapUrl: '',
      virtualTourUrl: '',
    });
  };

    useEffect(() => {
    if (property) {
        // Create previews for existing images if editing
        const imagesWithPreviews = property.images.map((image) => ({
        file: null, // No file because it's from the server
        preview: image, // Use the image URL as the preview
        }));

        setFormData({
        ...property,
        images: imagesWithPreviews, // Ensure previews are set for existing images
        });
    }
    }, [property]);


  const handleSubmit = async(e) => { 
    e.preventDefault();
    try {
        setLoading(true);

        await onSave(formData);

        clearFormData();// only clear after success

    } catch (error) {
        console.error("Error saving property:", error);
    } finally {
        setLoading(false);
    }
  };
  
    //handle cancel
    const handleCancel = () => {
      clearFormData();
      onCancel();
    };

    // Handle multiple image uploads and preview
    const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
    }));

    setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
    }));
    };


    // Optional: remove an image from the preview
    const handleRemoveImage = (index) => {
    setFormData(prev => {
        const updated = [...prev.images];

        // Only revoke if preview exists
        if (updated[index]?.preview) {
        URL.revokeObjectURL(updated[index].preview);
        }

        updated.splice(index, 1);

        return {
        ...prev,
        images: updated,
        };
    });
    };

    // 
    const ImageUploadButton = ({ onFilesSelected }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
    fileInputRef.current.click();
    };

  const handleChange = (e) => {
    if (onFilesSelected) {
      onFilesSelected(e);
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />

      {/* Icon button */}
        <button
            type="button"
            onClick={handleClick}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 transition-colors duration-200 shadow-sm"
        >
            <UploadCloud className="w-5 h-5" />
            <span className="text-sm font-semibold">Upload Images</span>
        </button>
        </div>
    );
    };

    //add array field
    const addArrayField = (fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: [...prev[fieldName], ""],
        }));
    };

    //update array field
    const updateArrayField = (fieldName, index, value) => {
    setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item),
    }));
    };

    //remove array field
    const removeArrayField = (fieldName, index) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: prev[fieldName].filter((_, i) => i !== index),
        }));
    };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-10">
        <div className="bg-white w-full max-w-5xl h-full max-h-[95vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">
                    {property ? 'Refine Listing' : 'New Global Listing'}
                    </h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Real Estate Inventory Console</p>
                </div>
                <button onClick={handleCancel} className="text-slate-400 hover:text-slate-900 p-2 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            {/* FORM */}
            <form className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 scrollbar-hide">
                {/* -------------------------- SECTION I: Identity -------------------------- */}
                <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b border-amber-100 pb-3">I. General Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Property Identity</label>
                            <input 
                            required 
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-600/10 focus:border-amber-600 transition-all outline-none" 
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                            placeholder="The Crystal Atrium" 
                            
                            />
                        </div>
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Valuation (PHP)
                        </label>
                        <input
                            required
                            type="number"
                            className="no-spinner w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-600/10 focus:border-amber-600 transition-all outline-none"
                            value={formData.price}
                            onChange={e =>
                            setFormData({ ...formData, price: e.target.value })
                            }
                        />
                        </div>
                        <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</label>
                                <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none cursor-pointer appearance-none" 
                                value={formData.status ?? "available"} onChange={e => 
                                setFormData({...formData, status: e.target.value})}>
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                    <option value="ongoing construction">Ongoing Construction</option>
                                    <option value="under-renovation">Under Renovation</option>
                                </select>
                            </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Location</label>
                            <input 
                            required 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-600/10 focus:border-amber-600 transition-all outline-none" 
                            value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Metro Manila, Philippines" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Unit Type</label>
                                <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none cursor-pointer appearance-none" 
                                value={formData.unitType ?? 'house'} onChange={e => 
                                setFormData({...formData, unitType: e.target.value})}>
                                    <option value="house">House</option>
                                    <option value="townhouse">Townhouse</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="condo">Condo</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Listing Type</label>
                                <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none cursor-pointer appearance-none" 
                                value={formData.listingType ?? "sale"} onChange={e => 
                                setFormData({...formData, listingType: e.target.value})}>
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                {/* -------------------------- SECTION II: Location -------------------------- */}
                <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b border-amber-100 pb-3">II. Location</h3>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Map URL</label>
                            <input 
                            required 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-600/10 focus:border-amber-600 transition-all outline-none" 
                            value={formData.mapUrl} 
                            onChange={e => setFormData({...formData, mapUrl: e.target.value})} 
                            placeholder="https://www.google.com/maps/embed?pb=!1m18!....."/>
                         </div>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Virtual Tour URL</label>
                            <input 
                            required 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-600/10 focus:border-amber-600 transition-all outline-none" 
                            value={formData.virtualTourUrl} 
                            onChange={e => setFormData({...formData, virtualTourUrl: e.target.value})} 
                            placeholder="https://www.youtube.com/1234567890"/>
                     </div>
                </section>

                {/* -------------------------- SECTION III: Architectural & Structural Data -------------------------- */}
                 <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b border-amber-100 pb-3">III. Architectural & Structural Data</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <Bed size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Bedrooms</label>
                            </div>
                            <input 
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.bedrooms} 
                            onChange={e => setFormData({...formData, bedrooms: Number(e.target.value)})}
                            placeholder="2"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <Bath size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Bathrooms</label>
                            </div>
                            <input 
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.bathrooms} 
                            onChange={e => setFormData({...formData, bathrooms: Number(e.target.value)})}
                            placeholder="2"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <Car size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Parking</label>
                            </div>
                            <input 
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.parking} 
                            onChange={e => setFormData({...formData, parking: Number(e.target.value)})}
                            placeholder="2 Car Garage"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <LandPlot  size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Lot Size</label>
                            </div>
                            <input 
                            required
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.lotSize} 
                            onChange={e => setFormData({...formData, lotSize: (e.target.value)})} 
                            placeholder="5000 sqft"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <SquaresUnite  size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Sqft</label>
                            </div>
                            <input 
                            required
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.sqft} 
                            onChange={e => setFormData({...formData, sqft: (e.target.value)})} 
                            placeholder="1000 sqft"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500"> 
                                <CalendarCheck  size={20} />
                                <label className="text-[10px] font-black uppercase tracking-widest">Year Est.</label>
                            </div>
                            <input 
                            type="text" 
                            placeholder="2022"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm outline-none" 
                            value={formData.yearBuilt} 
                            onChange={e => setFormData({...formData, yearBuilt: e.target.value})} 
                            />
                        </div>
                    </div>
                 </section>

                 {/* -------------------------- SECTION IV: AMENITIES -------------------------- */}
                  <section className="space-y-6">
                        <div className="flex justify-between items-center border-b border-amber-100 pb-3">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">IV. Amenities</h3>
                            <button 
                            type="button" 
                            onClick={() => 
                            addArrayField('amenities')} 
                            className="text-[10px] font-black text-slate-900 bg-slate-100 px-3 py-1 rounded hover:bg-slate-200 uppercase tracking-widest">
                                Add Feature
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input 
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-xs outline-none focus:border-slate-400 transition-all" 
                                    value={amenity} 
                                    onChange={e => updateArrayField('amenities', idx, e.target.value)} 
                                    placeholder="e.g. Infinity Pool" />

                                    <button type="button" 
                                    onClick={() => removeArrayField('amenities', idx)} 
                                    className="text-[10px] text-red-600 cursor-pointer px-3 py-1 rounded hover:text-red-900 uppercase tracking-widest">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                  </section>

                  {/* ------------------ SECTION V: Image Upload -------------------------- */}
                  <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b border-amber-100 pb-3">V. Image Upload</h3>
                        {/* IMAGE UPLOAD WITH PREVIEW */}
                        <div className="space-y-2 col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Property Images
                        </label>
                        <ImageUploadButton onFilesSelected={handleImageUpload} />

                        {/* Image previews */}
                            {formData.images.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                            >
                                <img
                                src={img.preview}
                                alt={`preview-${index}`}
                                className="object-cover w-full h-full"
                                />

                                <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-red-500 hover:text-white transition-colors"
                                >
                                <X size={16} />
                                </button>
                            </div>
                            ))}
                        </div>
                  </section>
                  {/* ------------------ SECTION VI: Marketing Description -------------------------- */}
                  <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b border-amber-100 pb-3">VI. Marketing Description</h3>
                        {/* MARKETING DESCRIPTION */}
                        <div className="space-y-2 col-span-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compelling Description</label>
                        <textarea rows={8} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm resize-none outline-none focus:ring-2 focus:ring-amber-600/5 focus:border-amber-600 transition-all" 
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                        placeholder="Draft the luxury lifestyle story for this property..." />
                        </div>
                  </section>
            </form>
            {/* FOOTER */}
            <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-6 flex-shrink-0">
            <button onClick={onCancel} className="px-8 py-4 rounded-xl font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase text-xs tracking-widest">
                Discard
            </button>
            <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className={`relative flex items-center justify-center px-12 py-4 rounded-xl 
                font-bold uppercase text-xs tracking-widest transition-all duration-300
                overflow-hidden
                ${loading 
                ? "bg-slate-900 cursor-not-allowed" 
                : "bg-slate-900 hover:bg-amber-600 active:scale-95"}`}
            >
            {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_linear_infinite]" />
            )}

            <span className="relative flex items-center gap-3 text-white">
                {/* Update or publish */}
                {property ? "Update Property" : "Publish Property"}
                {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
            </span>
            </button>
            </div>
        </div>
    </div>
  )
}

export default PropertyForm;