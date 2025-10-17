import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { assets } from '../../assets/asset'
import { IoMdSettings } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const feeds = [
    { img: assets.about_4, name: "Alan", msg: "Hi! I need more information.." },
    { img: assets.about_5, name: "Sophie", msg: "Can you share the details?" },
    { img: assets.about_6, name: "David", msg: "Looks interesting!" },
    { img: assets.about_1, name: "Maria", msg: "When will it be available?" },
    { img: assets.about_2, name: "John", msg: "I’m excited to try this out." },
  ];
 const [admin , setAdmin] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
  const fetchAdminData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAdmin(response.data.admin);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);

      // Redirect unauthorized users immediately
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // ✅ Block rendering until we know if the user is authorized
  if (loading) return <p>Loading...</p>;

  if (!admin) return null; 
  return (
  <>
    <div className="hii">
      <motion.div 
        className="colorBar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      <h3>Profile</h3>
      </motion.div>

      <motion.div className="profileBar" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <img src={admin.imageUrl} alt="profile" />
        <div className="profileInfo">
          <h2>{admin.name}</h2>
          <p>{admin.role}</p>
        </div>
        <button><IoMdSettings className='s-icon'/></button>
      </motion.div>
      <div className="contents">
        <motion.div className="div1" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay:0.5, ease: "easeOut" }}>
          <h4>Profile Summary</h4>
          <p>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
          <p>Full name</p>
          <p>mob</p>
          <p>email</p>
          <p>location</p> 
        </motion.div>
        <motion.div className="div2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay:1, ease: "easeOut" }}>
          <h4>Conversation</h4>
          {feeds.map((feed, index) => (
            <div key={index} className="feed">
              <img src={feed.img} alt={feed.name} />
              <div>
                <h5>{feed.name}</h5>
                <p>{feed.msg}</p>
              </div>
            </div>
          ))}
        </motion.div>
      <motion.div className="div2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay:1.5, ease: "easeOut" }}></motion.div>
    </div>
  </div>
</>
  )
}

export default Dashboard
