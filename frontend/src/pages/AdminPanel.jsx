import React, { useEffect, useState } from 'react'
import { usePropertyStore } from '../store/usePropertyStore'
import AdminPreviewModal from '../components/Admin-Components/AdminPreviewModal'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  UserPlus,
  Users,
  Eye,
  Pen,
  Trash,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  House
} from 'lucide-react'

//form
import PropertyForm from '../components/Admin-Components/PropertyForm';

const AdminPanel = () => {
  const { properties, fetchProperties, addProperty, updateProperty, deleteProperty } = usePropertyStore()
  const [isAdding, setIsAdding] = useState(false)
  const [previewProperty, setPreviewProperty] = useState(null)
  const [editingProperty, setEditingProperty] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [view, setView] = useState('overview');

  const navigate = useNavigate()

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const handleUpdateProperty = (property) => {
    setEditingProperty(property)
    setIsAdding(true)
  }

  const handleDeleteProperty = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this property?')) {
        await deleteProperty(id)
        fetchProperties()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const navItems = [
    { icon: <House size={18} />, label: 'Manage Property', onClick: () => setView('overview') },
    { icon: <Users size={18} />, label: 'Manage Agents', onClick: () => setView('agents') }
  ]

  return (
    <div className="fixed inset-0 z-[80] flex bg-white">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full z-50 flex flex-col items-center transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-24'} bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl`}
      >
        {/* Floating Collapse/Expand Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-4 w-6 h-6 bg-white text-slate-900 flex items-center justify-center rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-all"
          title={sidebarOpen ? 'Collapse' : 'Expand'}
        >
          {sidebarOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-4 px-6 py-6">
          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-serif font-bold italic text-2xl">
            R
          </div>
          {sidebarOpen && <h1 className="text-white font-bold text-lg uppercase tracking-wide">RealEstate CMS</h1>}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col mt-6">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className="group flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-amber-500 hover:text-white text-slate-200 font-semibold transition-all relative"
            >
              {item.icon}
              {sidebarOpen ? (
                <span>{item.label}</span>
              ) : (
                <span className="absolute left-full ml-2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-6 mt-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-full bg-amber-600 text-white px-4 py-3 rounded-full shadow-lg uppercase text-xs tracking-widest hover:bg-amber-500 transition-all"
          >
            {sidebarOpen ? 'Exit to Portal' : <LogOut size={16} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto bg-slate-50 p-8 sm:p-12 lg:p-16 transition-all duration-300
          ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        { view === 'overview' ? (

          <>
                  <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Portfolio Overview</h2>
              <p className="text-slate-500 mt-2">
                Manage {properties.length} active luxury listings across global sectors.
              </p>
            </div>
              <button 
              onClick={() => setIsAdding(true)}
              className='px-4 py-2 bg-amber-500 rounded-full text-slate-50 font-bold uppercase text-xs tracking-widest hover:bg-amber-600 transition-all'
              >
                <div className="flex items-center justify-center gap-2">
                  <Plus size={16} />
                  <span>Add Property</span>
                </div>
                  
              </button>
          </div>
      

          {/* Table */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                    Asset Identity
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                    Classification
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-right">
                    Market Value
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-right">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={property.images[0]}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg border border-slate-100"
                          />
                          <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {property.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                            <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
                            {property.address}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {property.type}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm inline-block w-fit shadow-sm border border-transparent ${
                            property.listingType === 'rent'
                              ? 'bg-blue-600 text-white'
                              : property.listingType === 'commercial'
                              ? 'bg-indigo-700 text-white'
                              : property.listingType === 'sale'
                              ? 'bg-green-700 text-white'
                              : 'bg-amber-600 text-white'
                          }`}
                        >
                          {property.listingType}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="text-xl font-serif font-bold text-slate-900">
                        ₱{property.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Asking Price
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setPreviewProperty(property)}
                          className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                          title="Preview Mode"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleUpdateProperty(property)}
                          className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm"
                          title="Edit Logic"
                        >
                          <Pen size={20} />
                        </button>

                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                          title="De-list Asset"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        ) : (
          <>
            <h1>Agents</h1>
          </>
        ) }
      </div>

      {/* Property Form */}
      {(isAdding || editingProperty) && (
        <PropertyForm
          property={editingProperty ?? null}
          onSave={async (formData, deletedImageIds) => {
            try {
              if (editingProperty) {
                await updateProperty(editingProperty._id, formData, deletedImageIds)
              } else {
                await addProperty(formData)
              }
              await fetchProperties()
              setIsAdding(false)
              setEditingProperty(null)
            } catch (err) {
              console.log(err)
            }
          }}
          onCancel={() => {
            setIsAdding(false)
            setEditingProperty(null)
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