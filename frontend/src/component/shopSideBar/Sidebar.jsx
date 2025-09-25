import React, { useState } from 'react'
import "./Sidebar.css"

const Sidebar = () => {
      const [showAll, setShowAll] = useState(false);
    
      const options = [
        "Women Yoga Tank Tops", "Women Yoga Tank Tops", "Women Relaxed Fit T-Shirts", "Women Oversized T-Shirts", "Women Cropped T-Shirts",
        "Women Jeans", "Women Cropped Tops", "Women Denim Jackets", "Women Cropped Polos", "Women Full Sleeve T-Shirts",
        "Women Holiday Shirts", "Women Cropped Hoodies", "Option 13", "Option 14", "Option 15",
        "Option 16", "Option 17", "Option 18", "Option 19", "Option 20",
      ];
    
      // Show first 9 or all based on showAll state
      const visibleOptions = showAll ? options : options.slice(0, 9);
    
      const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
      const [selectedSize, setSelectedSize] = useState("");
    
  return (
    <div className="sidebar">
          <h4>GENDER</h4>
          <div className="radio-wrapper">
            <label className="radio-button">
              <input id="option1" name="radio-group" type="radio"/>
              <span className="radio-checkmark"></span>
              <span className="radio-label">Male</span>
            </label>
          </div>

          <div className="radio-wrapper">
            <label className="radio-button">
              <input id="option2" name="radio-group" type="radio"/>
              <span className="radio-checkmark"></span>
              <span className="radio-label">Female</span>
            </label>
          </div>

          <div className="radio-wrapper">
            <label className="radio-button">
              <input id="option3" name="radio-group" type="radio"/>
              <span className="radio-checkmark"></span>
              <span className="radio-label">Other</span>
            </label>
          </div>
          <hr className='short-line'/>

          <h4>CATEGORIES</h4>
          {visibleOptions.map((option, index) => (
            <label key={index} className="checkbox-label">
              <input type="checkbox" value={option} name="option" /> <p>{option}</p>
            </label>
          ))}
    
          {/* Show More / Show Less button */}
          {options.length > 9 && (
            <button className="more-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "More"}
            </button>
          )}
          <hr className='short-line'/>

          <h4>SIZE</h4>
          <div className="size-buttons">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <hr className='short-line'/>
        </div>
  )
}

export default Sidebar
