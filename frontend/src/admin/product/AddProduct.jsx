import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
    quantity: "", 
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]); // store preview URLs

// handle text inputs
const handleChange = (e) => {
  const { name, value } = e.target;
  setProduct({ ...product, [name]: value });
};

// handle image uploads (max 4)
const handleImagesChange = (e) => {
  const files = Array.from(e.target.files).slice(0, 4); // max 4 images
  setImages(files);
};
useEffect(() => {
  const newPreviews = images.map((file) => URL.createObjectURL(file));
  setPreviews(newPreviews);

  // cleanup old URLs to prevent memory leaks
  return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
}, [images]);


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("discount", product.discount);
  formData.append("category", product.category);
  formData.append("size", product.size);
  formData.append("quantity", product.quantity);

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post("http://localhost:8080/admin/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Product added successfully");
    setProduct({
      title: "",
      price: "",
      category: "",
      description: "",
      size: "",
      quantity: "", 
    });
    setImages([]);
  } catch (error) {
    toast.error("Error adding product" + error.message);
  }
};



  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-title">Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <label>
            Product Title
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </label>

          <label>
            Size
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={handleChange}
              placeholder="Enter size (e.g., S, M, L)"
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
            />
          </label>

          <label>
            Discount
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
            />
          </label>

          <label>
            Product Images (up to 4)
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
            />
          </label>

          <div className="image-preview">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Preview ${index + 1}`}
              />
            ))}
          </div>

          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
