import productModel from "../models/ProductModel.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, discount, category, size, quantity } = req.body;

    // Check if images are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "products", // Cloudinary folder name
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(new Error("Error uploading image to Cloudinary"));
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer); // Send the file buffer to Cloudinary
        });
      })
    );

    // Create a new product
    const newProduct = new productModel({
      title,
      description,
      price,
      discount,
      category,
      size,
      quantity,
      images: uploadedImages, // Save the uploaded image URLs
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = req.user; // Use the user attached by the middleware

    res.status(200).json({
      success: true,
      message: "Welcome Admin!",
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        imageUrl: admin.imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin data" });
  }
};