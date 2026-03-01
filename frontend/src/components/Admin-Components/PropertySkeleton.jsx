const PropertySkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
    <div className="h-64 bg-slate-200" />
    <div className="p-5 flex-1 space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-100 rounded w-1/2" />
      <div className="flex gap-4">
        <div className="h-4 bg-slate-100 rounded w-12" />
        <div className="h-4 bg-slate-100 rounded w-12" />
        <div className="h-4 bg-slate-100 rounded w-12" />
      </div>
      <div className="h-10 bg-slate-200 rounded w-full" />
    </div>
  </div>
);
export default PropertySkeleton;