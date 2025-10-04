import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import UserDataContext from "../../context/UserData.jsx";

const Account = () => {
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(UserDataContext);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false); // toggle form visibility

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

  const profileEdit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/account", {
        email: decoded.email
      });
      setUser(response.data.user);
      setPreview(response.data.user.imageUrl);
    } catch (error) {
      toast.error("Failed to load account details");
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profilePic", imageFile);
      formData.append("email", decoded.email);
      formData.append("address", JSON.stringify(value));

      const response = await axios.post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(response.data.message);
      setShowForm(false); // hide form after save
      profileEdit(); // refresh profile info
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    profileEdit();
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "admin") setAdmin(true);
    }
  }, []);

  return (
    <div className="account-container">
      {/* Header */}
      <div className="account-header">
        <h1>My Account</h1>
        <button className="logout-btn-acc" onClick={logoutHandler}>Logout</button>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="image-box">
          {preview ? (
            <img src={preview} alt="User" className="profile-img" />
          ) : (
            <span className="upload-text">Upload Image</span>
          )}
        </div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>

        <button className="edit-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add / Edit Shipping Info"}
        </button>

        {admin && (
          <button className="admin-btn" onClick={() => navigate("/admin")}>
            Go to Admin Dashboard
          </button>
        )}
      </div>

      {/* Shipping Form */}
      {showForm && (
        <form className="shipping-form" onSubmit={saveHandler} encType="multipart/form-data">
          <h3>Shipping Address</h3>

          {/* Profile Picture Upload */}
          <label className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span>Change Profile Picture</span>
          </label>

          <input
            type="text"
            placeholder="Street"
            value={value.street}
            onChange={(e) => setValue({ ...value, street: e.target.value })}
            
          />

          <div className="grid">
            <input
              type="text"
              placeholder="City"
              value={value.city}
              onChange={(e) => setValue({ ...value, city: e.target.value })}
              
            />
            <input
              type="text"
              placeholder="State"
              value={value.state}
              onChange={(e) => setValue({ ...value, state: e.target.value })}
              
            />
          </div>

          <div className="grid">
            <input
              type="text"
              placeholder="Zipcode"
              value={value.zipcode}
              onChange={(e) => setValue({ ...value, zipcode: e.target.value })}
              
            />
            <input
              type="text"
              placeholder="Country"
              value={value.country}
              onChange={(e) => setValue({ ...value, country: e.target.value })}
              
            />
          </div>

          <input
            type="tel"
            placeholder="Phone"
            value={value.phone}
            onChange={(e) => setValue({ ...value, phone: e.target.value })}
            
          />

          <button type="submit" className="save-btn">
            Save Info
          </button>
        </form>
      )}
    </div>
  );
};

export default Account;
