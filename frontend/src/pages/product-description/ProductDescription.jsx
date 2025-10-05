import React, { useState, useEffect } from "react";
import "./ProductDescription.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [wishlisted, setWishlisted] = useState(false);

  // ✅ Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ✅ Fetch related products based on category
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!product?.category) return;
        const response = await axios.get(`http://localhost:8080/products/${id}/related`);
        const allProducts = response.data;

        // Filter products of same category except the current one
        const related = allProducts.filter(
          (p) => p.category === product.category && p._id !== product._id
        );
        setRelatedProducts(related.slice(0, 4)); // limit to 4 related items
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) fetchRelated();
  }, [product]);
  console.log("Related Products:", relatedProducts);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      storedCart.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        images: product.images,
        category: product.category,
        quantity: qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    toast.success("Product added to cart!");
  };

  // ✅ Prevent crash when product not loaded yet
  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className="product-description-page">
      <div className="product-header">
        <h1>{product.title}</h1>
        <p className="category">{product.category}</p>
      </div>

      <div className="product-content">
        <div className="image-section">
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="main-image"
            />
          )}
          <div className="thumbnail-list">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>

          {product.size?.length > 0 && (
            <div className="sizes">
              <h4>Select Size:</h4>
              <div className="size-options">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity">
            <h4>Quantity:</h4>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="buttons">
            <button className="add-to-car" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist ${wishlisted ? "active" : ""}`}
              onClick={() => setWishlisted(!wishlisted)}
            >
              {wishlisted ? "♥ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-list">
            {relatedProducts.map((rel) => (
              <div
                key={rel._id}
                className="related-card"
                onClick={() => navigate(`/product/${rel._id}`)}
              >
                <img
                  src={rel.images?.[0]}
                  alt={rel.title}
                  className="related-img"
                />
                <h3>{rel.title}</h3>
                <p>₹{rel.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
