import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import UserDataContext from "../../context/UserData.jsx";

export default function Account() {
    const navigate = useNavigate();
    const {admin, setAdmin} = useContext(UserDataContext);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const [user, setUser] = useState({
      name: "",
      email: "",
      role: "",
      imageUrl: ""
    });

    const [value, setValue] = useState({
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
    });

    const profileEdit = async(e) => {
      try {
        const response = await axios.post("http://localhost:8080/account", {
          email : decoded.email,
        });
        setUser(response.data.user);
        setPreview(response.data.user.imageUrl);

      } catch (error) {
        toast.error("Failed to load account details");
      }
    }

    const logoutHandler = async(e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            window.location.href = "/";
            toast.success("Logout successful");
        } catch (error) {
            toast.error("Logout failed", error);
        }
    }

    const saveHandler = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("profilePic", imageFile);                // image file
        formData.append("email", decoded.email);            // email
        formData.append("address", JSON.stringify(value));  // stringify nested object
    
        const response = await axios.post(
          "http://localhost:8080/upload",formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
    
        toast.success(response.data.message);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file); // save the file for backend upload
        setPreview(URL.createObjectURL(file)); // create preview link
      }
    };

     useEffect(() => {
       profileEdit()
     }
, [token]);

useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const decoded = jwtDecode(token);
      if(decoded.role === 'admin'){
        setAdmin(true);
      }
    }
  }
  ),[];  
  return (
    <>
    <div className="containerr">
  {/* Back button */}
  <button
    type="button"
    onClick={() => navigate("/")}
    className="back-btn"
  >
    Back
  </button>

  <form className="forms" onSubmit={saveHandler} encType="multipart/form-data">
    {/* Profile Section */}
    <div className="profile-section">
      {/* Round image upload */}
      <label className="image-upload">
      <div className="image-box">
        {preview ? (
          <img src={preview} alt="User" className="profile-img" />
        ) : (
          <span className="upload-text">Upload Image</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden-input"
        onChange={handleImageChange}
      />
    </label>

      {/* Name & Email */}
      <h2 className="user-name">{user?.name}</h2>
      <p className="user-email">{user?.email}</p>

      {/* Reset Password Button */}
      <button
        type="button"
        onClick={() => navigate("/forgot-password")}
        className="reset-btn"
      >
        Reset Password
      </button>
    </div>

    {/* Shipping Form */}
    <div className="shipping-section">
      <h3 className="section-title">Shipping Address</h3>

      <input
        type="text"
        name="firstName"
        placeholder="First name"
        disabled
        defaultValue={user?.name}
        className="input-field"
      />

      <input
        type="email"
        name="email"
        placeholder="Email address"
        disabled
        defaultValue={user?.email}
        className="input-field"
      />

      <input
        type="text"
        name="street"
        placeholder="Street"
        className="input-field"
        onChange={(e) => setValue({...value, street: e.target.value})} 
        required
      />

      {/* City + State */}
      <div className="grid">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="input-field"
          onChange={(e) => setValue({...value, city: e.target.value})}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          className="input-field"
          onChange={(e) => setValue({...value, state: e.target.value})}
          required
        />
      </div>

      {/* Zip + Country */}
      <div className="grid">
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          className="input-field"
          onChange={(e) =>setValue({...value, zipcode: e.target.value})}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="input-field"
          onChange={(e) => setValue({...value, country: e.target.value})}
          required
        />
      </div>

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        className="input-field"
        onChange={(e) => setValue({...value, phone: e.target.value})}
        required
      />

      {/* Save Button */}
      <button type="submit" className="save-btn" >
        Save Shipping Info
      </button>
      <button className="save-btn" onClick={logoutHandler}>
          Logout
        </button>
      {admin && (
        <button
          type="button"
          onClick={() => navigate("/admin/dashboard")}
          className="save-btn"
        >
          Go to Admin Dashboard
        </button>
      )}
    </div>
  </form>
</div>

    </>
  );
}
