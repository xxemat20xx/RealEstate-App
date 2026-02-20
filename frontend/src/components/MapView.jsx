import React from "react";

// Extract src from iframe OR accept raw URL
const extractSrc = (input) => {
  if (!input) return null;

  try {
    // If already a direct URL
    if (input.startsWith("http")) return input;

    // If full iframe was pasted
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
    const iframe = doc.querySelector("iframe");

    return iframe?.src || null;
  } catch {
    return null;
  }
};

const isValidGoogleMapsEmbed = (url) => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "www.google.com" &&
      parsed.pathname.startsWith("/maps/embed")
    );
  } catch {
    return false;
  }
};

const MapView = ({ url }) => {
  const cleanUrl = extractSrc(url);

  if (!cleanUrl || !isValidGoogleMapsEmbed(cleanUrl)) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100 rounded-2xl">
        <p className="text-sm text-slate-500">Invalid map URL</p>
      </div>
    );
  }

  return (
    <iframe
      src={cleanUrl}
      className="w-full h-full rounded-2xl"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default MapView;