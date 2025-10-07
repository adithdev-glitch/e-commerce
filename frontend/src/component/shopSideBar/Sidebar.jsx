import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const visibleOptions = showAll ? categories : categories.slice(0, 9);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Remove category
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Add category
      setSelectedCategories([...selectedCategories, category]);
    }
  };


  return (
    <div className="sidebar">
      <h4>GENDER</h4>
      <div className="radio-wrapper">
        <label className="radio-button">
          <input name="radio-group" type="radio" />
          <span className="radio-checkmark"></span>
          <span className="radio-label">Male</span>
        </label>
      </div>

      <div className="radio-wrapper">
        <label className="radio-button">
          <input name="radio-group" type="radio" />
          <span className="radio-checkmark"></span>
          <span className="radio-label">Female</span>
        </label>
      </div>

      <div className="radio-wrapper">
        <label className="radio-button">
          <input name="radio-group" type="radio" />
          <span className="radio-checkmark"></span>
          <span className="radio-label">Other</span>
        </label>
      </div>

      <hr className="short-line" />

      <h4>CATEGORIES</h4>
      {visibleOptions.map((category, idx) => (
        <label key={idx} className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <p>{category}</p>
        </label>
      ))}

      {categories.length > 9 && (
        <button className="more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "More"}
        </button>
      )}

      <hr className="short-line" />

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

      <hr className="short-line" />
    </div>
  );
};

export default Sidebar;
