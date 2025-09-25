import React, { useEffect, useRef, useState } from 'react'
import './Arrival.css'
import { assets } from '../../assets/asset'
import { FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const NewArrival = () => {
  const products = [
    { id: 1, name: 'Denim Blue Jean', price: '$19.99', image: assets.pro_1_1, hoverImage: assets.pro_1_2},
    { id: 2, name: 'Urban Charcoal', price: '$29.99', image: assets.pro_2_1, hoverImage: assets.pro_2_2 },
    { id: 3, name: 'Soft Power Suit', price: '$39.99', image: assets.pro_3_1, hoverImage: assets.pro_3_2 },
    { id: 4, name: 'Dot & Rebel', price: '$19.99', image: assets.pro_4_1, hoverImage: assets.pro_4_2 },
    { id: 5, name: 'Retro Street', price: '$29.99', image: assets.pro_5_1, hoverImage: assets.pro_5_2 },
    { id: 6, name: 'Denim Blue Jean', price: '$19.99', image: assets.pro_1_1, hoverImage: assets.pro_1_2},
    { id: 7, name: 'Urban Charcoal', price: '$29.99', image: assets.pro_2_1, hoverImage: assets.pro_2_2 },
    { id: 8, name: 'Soft Power Suit', price: '$39.99', image: assets.pro_3_1, hoverImage: assets.pro_3_2 },
  ];
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollToStart = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    };
  
    requestAnimationFrame(scrollToStart);
  }, []);
  

  return (
    <>
    <div className="main-1">
      <div className="arrival-header">
        <h2>New Arrivals</h2>
        <div className="arrows">
          <FaArrowLeftLong onClick={() => scroll('left')}/>
          <FaArrowRightLong onClick={() => scroll('right')}/>
        </div>
      </div>
      <div className="products" ref={scrollRef}>
        {products.map(product => (
          <div className="product" key={product.id}>
            <p className='badge'>New</p>
            <CiHeart
              className={`heart-icon ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            />
            <div className="product-img">
            <img src={product.image} alt={`New Arrival - ${product.name}`} />
            <img src={product.hoverImage} alt={product.name} className="hover-img" />
            </div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>

    </div>
    
    </>
  )
}

export default NewArrival
