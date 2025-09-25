import React from 'react'
import './Dashboard.css'
import { assets } from '../../assets/asset'
import { IoMdSettings } from "react-icons/io";

const Dashboard = () => {
  const feeds = [
    { img: assets.about_4, name: "Alan", msg: "Hi! I need more information.." },
    { img: assets.about_5, name: "Sophie", msg: "Can you share the details?" },
    { img: assets.about_6, name: "David", msg: "Looks interesting!" },
    { img: assets.about_1, name: "Maria", msg: "When will it be available?" },
    { img: assets.about_2, name: "John", msg: "I’m excited to try this out." },
  ];

  return (
  <>
    <div className="hii">
      <div className="colorBar">
          <h3>Profile</h3>
      </div>
      <div className="profileBar">
        <img src={assets.about_6} alt="profile" />
        <div className="profileInfo">
          <h2>adith</h2>
          <p>admin</p>
        </div>
        <button><IoMdSettings className='s-icon'/></button>
      </div>
      <div className="contents">
        <div className="div1">
          <h4>Profile Summary</h4>
          <p>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
          <p>Full name</p>
          <p>mob</p>
          <p>email</p>
          <p>location</p> 
        </div>
        <div className="div2">
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
        </div>
      <div className="div2"></div>
    </div>
  </div>
</>
  )
}

export default Dashboard
