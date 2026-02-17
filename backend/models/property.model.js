import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapUrl: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    parking: {
      type: Number,
      required: true,
    },
    sqft: {
      type: Number,
      required: true,
    },
    lotSize: {
      type: Number,
    },
    yearBuilt: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    unitType: {
      type: String,
      enum: ["house", "apartment", "condo", "townhouse"],
      required: true,
    },
    listingType: {
      type: String,
      enum: ["sale", "rent", "commercial"],
    },
    images: {
      type: [String],
      required: true,
    },
    imageIds: {
      type: [String],
      required: true,
    },

    amenities: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "ongoing construction", "under renovation"],
      required: true,
    },
    agent: {
      type: String,
    },
    virtualTourUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Property = mongoose.model("Property", propertySchema);
