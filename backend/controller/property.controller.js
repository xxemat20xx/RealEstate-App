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
    // Find the property by ID
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // 1️⃣ DELETE images from Cloudinary
    const deletedImageIds = req.body.deletedImageIds || []; // These are the image publicIds that should be deleted

    if (deletedImageIds.length > 0) {
      // Loop through the imageIds and remove them from Cloudinary
      for (const publicId of deletedImageIds) {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`Cloudinary Image Deleted: ${result}`);
      }

      // 2️⃣ Remove the images from the property record
      property.imageIds = property.imageIds.filter(
        (publicId) => !deletedImageIds.includes(publicId),
      );
      property.images = property.images.filter(
        (url) => !deletedImageIds.some((id) => url.includes(id)), // Assuming the URL contains the Cloudinary public ID
      );
    }

    // 3️⃣ UPLOAD new images (if any)
    const uploadedImages = [];
    const uploadedImageIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "properties", // Folder in Cloudinary
                  resource_type: "image", // Type of resource
                  quality: "auto", // Quality setting
                  fetch_format: "auto", // Automatic format based on browser's capabilities
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

      // Append the newly uploaded images to the database
      property.images.push(...uploadedImages);
      property.imageIds.push(...uploadedImageIds);
    }

    // 4️⃣ Update other fields of the property
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

    // Assign the updated values to the property document
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

    // Save the updated property
    await property.save();

    return res.status(200).json(property); // Return the updated property to the frontend
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
