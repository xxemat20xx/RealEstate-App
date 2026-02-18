import React, { useEffect, useState } from 'react'
import { usePropertyStore } from '../store/usePropertyStore'
import AdminPreviewModal from '../components/AdminPreviewModal';
import PropertyForm from '../components/PropertyForm';

const AdminPanel = () => {
 const { properties, fetchProperties, addProperty, updateProperty, deleteProperty } = usePropertyStore();
 const [isAdding, setIsAdding] = useState(false);
 const [previewProperty, setPreviewProperty] = useState(null);
 const [editingProperty, setEditingProperty] = useState(null);
 useEffect(() => {
  fetchProperties();
 }, [fetchProperties]);
 
//  add
const handleAddProperty = () => {
    setEditingProperty(null);
    setIsAdding(true);
}

// update
const handleUpdateProperty = (property) => {

  setEditingProperty(property);
  setIsAdding(true);
  console.log(property);
  // set preview image
  
}

// delete
const handleDeleteProperty = async(id) => {
  try {
    if(window.confirm("Are you sure you want to delete this property?")){
      await deleteProperty(id);
      fetchProperties();
    }
  } catch (error) {
    console.log(error);
  }

}



 return (
     <div className="fixed inset-0 z-[80] bg-white flex flex-col animate-in fade-in duration-300">
      <nav className="h-20 border-b border-slate-200 px-8 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold italic text-2xl">L</div>
          <div>
            <h2 className="text-lg font-bold">RealEstate CMS</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Inventory Management</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add New Asset
          </button>
          <button className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-full">
            <span className="text-xs font-black uppercase tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </nav>
      
      <div className="flex-1 overflow-y-auto bg-slate-50 p-8 sm:p-12 lg:p-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Portfolio Overview</h2>
              <p className="text-slate-500 mt-2">Manage {properties.length} active luxury listings across global sectors.</p>
            </div>
          </div>

          {/* table */}
           <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Asset Identity</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Classification</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-right">Market Value</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {properties.map(property => (
                        <tr key={property._id} className="hover:bg-slate-50/80 transition-all group">
                            <td className="px-8 py-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                <img src={property.images[0]} className="w-16 h-16 rounded-2xl object-cover shadow-lg border border-slate-100" />
                                <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div>
                                <p className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{property.title}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                                    <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    {property.address}
                                </p>
                                </div>
                            </div>
                            </td>
                            <td className="px-8 py-6">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{property.type}</span>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm inline-block w-fit shadow-sm border border-transparent ${
                                property.listingType === 'rent' ? 'bg-blue-600 text-white' : 
                                property.listingType === 'commercial' ? 'bg-indigo-700 text-white' : 
                                property.listingType === 'sale' ? 'bg-green-700 text-white' : 
                                'bg-amber-600 text-white'
                                }`}>
                                {property.listingType}
                                </span>
                            </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                            <p className="text-xl font-serif font-bold text-slate-900">₱{property.price.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Asking Price</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                <button 
                                onClick={() => setPreviewProperty(property)}
                                className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                                title="Preview Mode"
                                >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                </button>
                                <button 
                                onClick={() => handleUpdateProperty(property)}
                                className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm"
                                title="Edit Logic"
                                >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </button>

                                <button 
                                onClick={() => handleDeleteProperty(property._id)}
                                className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                                title="De-list Asset"
                                >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        </div>
      </div>
      {/* isAdding or editingPropert */}
      {(isAdding || editingProperty) && (
      <PropertyForm
        property={editingProperty ?? null}
        onSave={async (p) => {
          try {
            const formData = new FormData();
            Object.keys(p).forEach(key => {
              if (key === "images") {
               p.images.forEach(img => {
                  if (img.file instanceof File) {
                    formData.append("images", img.file);
                  }
                });
              } else if (Array.isArray(p[key])) {
                p[key].forEach(item => formData.append(key, item)); // handle arrays like amenities
              } else {
                formData.append(key, p[key]);
              }
            });

            if (editingProperty) {
              await updateProperty(editingProperty._id, formData);
            } else {
              await addProperty(formData);
            }
            fetchProperties();
            setIsAdding(false);
            setEditingProperty(null);
          } catch (err) {
            console.log(err);
          }
        }}
        onCancel={() => {
          setIsAdding(false);
          setEditingProperty(null);
        }}
      />

      )}

      {/* Preview Modal */}
      {previewProperty && (
        <AdminPreviewModal property={previewProperty} onClose={() => setPreviewProperty(null)} />
      )}
     </div>
  )
}

export default AdminPanel