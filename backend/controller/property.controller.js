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
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  try {
    //fetch property
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    //delete old images
    for (const publicId of property.imageIds) {
      await cloudinary.uploader.destroy(publicId);
    }

    //upload new images
    const uploadedImages = [];
    const uploadedImageIds = [];

    for (const image of req.body.images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "properties",
      });
      uploadedImages.push(result.secure_url);
      uploadedImageIds.push(result.public_id);
    }

    //update property
    property.title = req.body.title;
    property.description = req.body.description;
    property.address = req.body.address;
    property.city = req.body.city;
    property.state = req.body.state;
    property.zip = req.body.zip;
    property.price = req.body.price;
    property.bedrooms = req.body.bedrooms;
    property.bathrooms = req.body.bathrooms;
    property.parking = req.body.parking;
    property.sqft = req.body.sqft;
    property.lotSize = req.body.lotSize;
    property.yearBuilt = req.body.yearBuilt;
    property.unitType = req.body.unitType;
    property.listingType = req.body.listingType;
    property.images = uploadedImages;
    property.imageIds = uploadedImageIds;
    property.amenities = req.body.amenities;
    property.status = req.body.status;
    property.agent = req.body.agent;
    property.virtualTourUrl = req.body.virtualTourUrl;

    await property.save();

    res.status(200).json(property);
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
export const getProperties = async (req, res) => {
  // get all
  try {
    //fetch property
    const property = await Property.find();
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getProperty = async (req, res) => {
  // get property by id
  try {
    //fetch property
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
