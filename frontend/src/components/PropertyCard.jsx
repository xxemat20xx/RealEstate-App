import React, { useState } from 'react';

const FeatureIcon = ({ feature }) => {
  const f = feature.toLowerCase();

  if (f.includes('pool'))
    return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    );

  if (f.includes('smart') || f.includes('tech'))
    return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2-2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
      </svg>
    );

  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M5 13l4 4L19 7"/>
    </svg>
  );
};

const PropertyCard = ({ property, onClick }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const getLabelStyles = (label) => {
    switch (label) {
      case 'For Rent':
        return 'bg-blue-600/90 text-white backdrop-blur-sm';
      case 'Commercial':
        return 'bg-indigo-700/90 text-white backdrop-blur-sm';
      case 'For Sale':
      default:
        return 'bg-amber-600/90 text-white backdrop-blur-sm';
    }
  };

  const handleToggleFeatures = (e) => {
    e.stopPropagation();
    setShowAllFeatures(!showAllFeatures);
  };

  const features = property.features || [];

  const displayedFeatures = showAllFeatures
    ? features
    : features.slice(0, 5);

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="bg-white/95 backdrop-blur px-3 py-1 rounded text-[10px] font-black uppercase">
            {property.type}
          </div>
          <div className={`px-3 py-1 rounded text-[10px] font-black uppercase ${getLabelStyles(property.listingLabel)}`}>
            {property.listingLabel}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-white font-bold text-2xl z-10">
          ${property.price?.toLocaleString()}
          {property.listingLabel === 'For Rent' && (
            <span className="text-sm font-normal ml-1 opacity-90">/mo</span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-1">{property.title}</h3>

          <p className="text-slate-500 text-sm mb-4">
            {property.location}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {displayedFeatures?.map((feature, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-slate-50 text-slate-500 px-2 py-1 rounded text-[10px] font-medium uppercase"
              >
                <FeatureIcon feature={feature} />
                {feature}
              </span>
            ))}

            {property.features?.length > 5 && (
              <button
                onClick={handleToggleFeatures}
                className="text-[10px] text-amber-600 font-black uppercase"
              >
                {showAllFeatures
                  ? 'View Less'
                  : `+ ${property.features.length - 5} More`}
              </button>
            )}
          </div>
        </div>

        <button className="w-full border border-slate-900 py-2 rounded font-medium hover:bg-slate-900 hover:text-white transition-colors">
          View {property.listingLabel === 'Commercial' ? 'Workspace' : 'Residence'}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;