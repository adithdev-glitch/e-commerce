import React, { useState } from 'react'
import "./Shop.css"
import Sidebar from '../../component/shopSideBar/Sidebar'
import { CiHeart } from "react-icons/ci";


const Shop = () => {

  const [sortOption, setSortOption] = useState("popularity");
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    console.log("Selected sort:", e.target.value);
  }

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id)); // remove
    } else {
      setWishlist([...wishlist, id]); // add
    }
  };

  const products = [
    { id: 1, name: "T-Shirt",cato: "shirt" ,price: 19.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1742462378_8744677.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1742462378_8887233.jpg?w=480&dpr=2.0"  },
    { id: 2, name: "Jeans",cato: "shirt" , price: 39.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745833479_1164230.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1675317152_8550135.jpg?w=480&dpr=2.0" },
    { id: 3, name: "Sneakers",cato: "shirt" , price: 59.99, img: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738381445_7472021.jpg?w=480&dpr=2.0', hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738381445_2542423.jpg?w=480&dpr=2.0"  },
    { id: 4, name: "Hoodie",cato: "shirt" , price: 29.99, img: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752899961_5088276.jpg?w=480&dpr=2.0', hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752137527_1099406.jpg?w=480&dpr=2.0" },
    { id: 5, name: "Cap",cato: "shirt" , price: 9.99, img: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1755860600_1972313.jpg?w=480&dpr=2.0', hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1755860600_4281793.jpg?w=480&dpr=2.0" },
    { id: 6, name: "Watch",cato: "shirt" , price: 79.99, img: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738667232_8252422.jpg?w=480&dpr=2.0', hoverImg:'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738067821_7858974.jpg?w=480&dpr=2.0'  },
    { id: 7, name: "Bag",cato: "shirt" , price: 49.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747830091_7216091.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747830091_3244467.jpg?w=480&dpr=2.0"},
    { id: 8, name: "Sunglasses",cato: "shirt" , price: 24.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1749630516_1384266.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1749630516_8285385.jpg?w=480&dpr=2.0"},
    { id: 9, name: "Belt",cato: "shirt" , price: 14.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1744179149_6593621.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1744179149_4184075.jpg?w=480&dpr=2.0" },
    { id: 10, name: "Shoes",cato: "shirt" , price: 69.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737977625_9412458.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1732953561_2875149.jpg?w=480&dpr=2.0" },
    { id: 11, name: "Jacket",cato: "shirt" , price: 89.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1746538775_8921688.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745560068_8062733.jpg?w=480&dpr=2.0" },
    { id: 12, name: "Shorts",cato: "shirt" , price: 22.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747905390_5062569.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747905155_6124365.jpg?w=480&dpr=2.0" },
    { id: 13, name: "Scarf",cato: "shirt" , price: 12.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745998398_6754418.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745998398_8942674.jpg?w=480&dpr=2.0" },
    { id: 14, name: "Gloves",cato: "shirt" , price: 15.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1733922830_1686830.jpg?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1733495513_1047782.jpg?w=480&dpr=2.0" },
    { id: 15, name: "Sweater",cato: "shirt" , price: 34.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1713525508_6426850.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691245684_6549290.jpg?w=480&dpr=2.0"},
    { id: 16, name: "Suit",cato: "shirt" , price: 129.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1721367660_1460460.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1721367660_1290495.jpg?w=480&dpr=2.0"},
    { id: 17, name: "Dress",cato: "shirt" , price: 49.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727962341_5177993.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730963820_1772524.jpg?w=480&dpr=2.0"},
    { id: 18, name: "Skirt",cato: "shirt" , price: 27.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1716790915_4200014.png?w=480&dpr=2.0", hoverImg:"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1716790915_5333571.jpg?w=480&dpr=2.0" },
    { id: 19, name: "Tie",cato: "shirt" , price: 8.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1713525964_8736227.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1698209863_8330408.jpg?w=480&dpr=2.0"},
    { id: 20, name: "Perfume",cato: "shirt" , price: 99.99, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738061155_4108711.jpg?w=480&dpr=2.0", hoverImg: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738061155_1398966.jpg?w=480&dpr=2.0"},
  ];

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
              <div key={product.id} className="product-card">
                <div className="img-wrapper">
                <div className="wishlist-icon" onClick={() => toggleWishlist(product.id)}>
                  {wishlist.includes(product.id) ? (
                    <CiHeart className="heart filled" />
                  ) : (
                    <CiHeart className="heart" />
                  )}
                </div>
                  <img src={product.img} alt={product.name} className="default-img" />
                  <img src={product.hoverImg} alt={product.name} className="hover-img" />
                </div>
                <h3>{product.name}</h3>
                <hr />
                <h4>{product.cato}</h4>
                <p>${product.price}</p>
                {/* <button>Add to Cart</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
