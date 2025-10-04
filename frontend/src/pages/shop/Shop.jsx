import React, { useEffect, useState } from 'react'
import "./Shop.css"
import Sidebar from '../../component/shopSideBar/Sidebar'
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Shop = () => {

  const [sortOption, setSortOption] = useState("popularity");
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  }

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // store only product IDs in state
    setWishlist(storedWishlist.map((item) => item._id));
  }, []);

  // Toggle wishlist state + localStorage
  const toggleWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = storedWishlist.find((item) => item._id === product._id);

    let updatedWishlist;
    if (exists) {
      // remove
      updatedWishlist = storedWishlist.filter((item) => item._id !== product._id);
    } else {
      // add
      updatedWishlist = [...storedWishlist, product];
    }

    // update localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // update state (only IDs)
    setWishlist(updatedWishlist.map((item) => item._id));
  };

  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data); // store in state
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts(); // call the function
  }, []);



  return (
    <>
      <div className="frame">
        <Sidebar/>
        <div className="content-sec">
          <div className="heading-sec">
            <h2>STORE</h2>
            <select value={sortOption} onChange={handleSortChange} className="custom-select">
              <option value="a-z">A-Z</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <div className="products-sec">
            {products.map((product) => (
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
                <img src={product.images[1]} alt={product.name} className="hover-img"/>
                )}
                </div>
                <h3>{product.title}</h3>
                <hr />
                <h4>{product.category}</h4>
                <p>${product.price}</p>
                <Link to={`/home/product/${product._id}`} className='descc-btn'>Buy Now</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
