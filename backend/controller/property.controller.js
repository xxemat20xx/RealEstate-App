import { Property } from "../models/property.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      mapUrl,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType,
      listingType,
      amenities,
      status,
      agent,
      virtualTourUrl,
    } = req.body;

    const uploadedImages = [];
    const uploadedImageIds = [];

    // 🔥 Files now come from req.files
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "properties",
              resource_type: "image",
              quality: "auto",
              fetch_format: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(file.buffer);
      });

      uploadedImages.push(result.secure_url);
      uploadedImageIds.push(result.public_id);
    }

    const property = new Property({
      title,
      description,
      address,
      mapUrl,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType: unitType || "apartment",
      listingType: listingType || "sale",
      images: uploadedImages,
      imageIds: uploadedImageIds,
      amenities: amenities || [],
      status: status || "available",
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
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // 1️⃣ DELETE only selected images
    const deletedImageIds = req.body.deletedImageIds || [];

    // Ensure imageIds is initialized
    property.imageIds = property.imageIds || [];

    for (const publicId of deletedImageIds) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Remove deleted from DB arrays
    property.images = property.images.filter(
      (_, index) => !deletedImageIds.includes(property.imageIds[index]),
    );
    property.imageIds = property.imageIds.filter(
      (publicId) => !deletedImageIds.includes(publicId),
    );

    // 2️⃣ UPLOAD new images (if any)
    const uploadedImages = [];
    const uploadedImageIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "properties",
                  resource_type: "image",
                  quality: "auto",
                  fetch_format: "auto",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                },
              )
              .end(file.buffer);
          });

          uploadedImages.push(result.secure_url);
          uploadedImageIds.push(result.public_id);
        } catch (error) {
          console.error(`Error uploading image: ${error}`);
          return res.status(500).json({ message: "Error uploading image" });
        }
      }

      property.images.push(...uploadedImages);
      property.imageIds.push(...uploadedImageIds);
    }

    // 3️⃣ Update other fields safely
    const {
      title,
      description,
      address,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType,
      listingType,
      amenities,
      status,
      agent,
      virtualTourUrl,
      mapUrl,
    } = req.body;

    if (isNaN(price))
      return res.status(400).json({ message: "Invalid price value" });

    Object.assign(property, {
      title,
      description,
      address,
      price,
      bedrooms,
      bathrooms,
      parking,
      sqft,
      lotSize,
      yearBuilt,
      unitType: unitType || property.unitType || "apartment",
      listingType: listingType || property.listingType || "sale",
      amenities,
      status: status || property.status || "available",
      agent,
      virtualTourUrl,
      mapUrl,
    });

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
