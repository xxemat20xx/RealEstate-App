import { Property } from "../models/property.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      zip,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType,
      listingType,
      images,
      amenities,
      status,
      agent,
      virtualTourUrl,
    } = req.body;

    // Upload images to Cloudinary
    const uploadedImages = [];
    const uploadedImageIds = []; // <-- store public_id for deletion

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "properties",
      });
      uploadedImages.push(result.secure_url);
      uploadedImageIds.push(result.public_id);
    }

    // Save property in MongoDB with both secure URLs and public IDs
    const property = new Property({
      title,
      description,
      address,
      city,
      state,
      zip,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType,
      listingType,
      images: uploadedImages,
      imageIds: uploadedImageIds,
      amenities,
      status,
      agent,
      virtualTourUrl,
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Delete all Cloudinary images using public_id
    for (const publicId of property.imageIds) {
      console.log("Deleting Cloudinary image:", publicId);
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete property from MongoDB
    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
