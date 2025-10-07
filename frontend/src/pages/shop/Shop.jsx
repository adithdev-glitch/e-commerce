import React, { useEffect, useState } from "react";
import Sidebar from "../../component/shopSideBar/Sidebar";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist.map((item) => item._id));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products instantly when categories change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => selectedCategories.includes(product.category))
      );
    }
  }, [selectedCategories, products]);

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = storedWishlist.find((item) => item._id === product._id);
    let updatedWishlist;
    if (exists) {
      updatedWishlist = storedWishlist.filter((item) => item._id !== product._id);
    } else {
      updatedWishlist = [...storedWishlist, product];
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist.map((item) => item._id));
  };

  return (
    <div className="frame">
      <Sidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <div className="content-sec">
        <h2>STORE</h2>
        <div className="products-sec">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="img-wrapper">
                  <div className="wishlist-icon" onClick={() => toggleWishlist(product)}>
                    {wishlist.includes(product._id) ? (
                      <CiHeart className="heart filled" />
                    ) : (
                      <CiHeart className="heart" />
                    )}
                  </div>
                  <img src={product.images[0]} alt={product.name} className="default-img" />
                  {product.images[1] && (
                    <img src={product.images[1]} alt={product.name} className="hover-img" />
                  )}
                </div>
                <h3>{product.title}</h3>
                <hr />
                <h4>{product.category}</h4>
                <p>${product.price}</p>
                <Link to={`/home/product/${product._id}`} className="descc-btn">
                  Buy Now
                </Link>
              </div>
            ))
          ) : (
            <p className="no-products">No products found in selected categories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
