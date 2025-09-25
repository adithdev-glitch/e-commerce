import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import UserDataContext from '../../context/UserData';



const Auth = ({ onClose }) => {
  const navigate = useNavigate();
  const {setAdmin} = useContext(UserDataContext);
  const [isSignup, setIsSignup] = useState(false);
  const toggleForm = () => setIsSignup(prev => !prev);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        name,
        email,
        password
      });
      toast.success(response.data.message);
      navigate("/verify", { state: {name, email, password} } );
    } catch (error) {
      toast.error("Registeration failed");
    }

  }

  const loginHandler = async(e) => {
    e.preventDefault();
    try {
      if(localStorage.getItem("token")){
        toast.error("You are already logged in");
        return;
      }
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password
      });
      toast.success(response.data.message);
      localStorage.setItem("token",response.data.token);
      navigate("/");
      onClose();
    } catch (error) {
      toast.error("Login failed");
    }
  }

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post("http://localhost:8080/google-register", {
        name : decoded.name,
        email : decoded.email,
        googleId : decoded.sub,
      });
      toast.success(response.data.message);
      localStorage.removeItem("token");
      localStorage.setItem("token",response.data.token);
      navigate("/");
      onClose();
    } catch (e) {
      toast.error("Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const response = await axios.post("http://localhost:8080/google-login", {
        email : decoded.email,
        googleId : decoded.sub,
      });
      toast.success(response.data.message);
      localStorage.removeItem("token");
      localStorage.setItem("token",response.data.token);
      navigate("/");
      onClose();
    } catch (error) {
      toast.error("Login failed");
    }
  }

  return (
    <>
    <section className="home">
    <div className={`form_container ${isSignup ? 'active' : ''}`}>
    <IoCloseSharp className='form_close' onClick={onClose}/>
      <div className="form login_form">
        <form onSubmit={loginHandler}>
        
          <h2>Login</h2>

          <div className="input_box">
            <input type="email" placeholder="Enter your email" onChange={(e) =>{setEmail(e.target.value)}} required />
            <i className='email'><MdOutlineMail/></i>
          </div>

          <div className="input_box">
            <input type="password" placeholder="Enter your password" onChange={(e) =>{setPassword(e.target.value)}}  required />
            <i className='password'><IoLockClosedOutline /></i>
          </div>


          <div className="option_field">
              <a href="/forgot-password" className="forgot_pw">Forgot password?</a>
            </div>

          <button type="submit" className="button">Login Now</button>

          <div className="login_signup">
            Don’t have an account? <a onClick={toggleForm}>Signup</a>
          </div>
          <ul>
            <li>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
              console.log("Google Login Failed");
              }}
            />
            </li>
          </ul>
        </form>
      </div>

      <div className="form signup_form">
        <form onSubmit={registerHandler}>
          <h2>Signup</h2>

          <div className="input_box">
            <input type="text" placeholder="Enter your name" onChange={(e) =>{setName(e.target.value)}} required />
            <i className='email'><CiUser /></i>
          </div>

          <div className="input_box">
            <input type="email" placeholder="Enter your email" onChange={(e) =>{setEmail(e.target.value)}} required />
            <i className='email'><MdOutlineMail/></i>
          </div>

          <div className="input_box">
            <input type="password" placeholder="Enter your password" onChange={(e) =>{setPassword(e.target.value)}} required />
            <i className='password'><IoLockClosedOutline /></i>
          </div>

          <button type="submit" className="button">Signup Now</button>

          <div className="login_signup">
            Already have an account? <a onClick={toggleForm}>Login</a>
          </div>
        </form>
        <ul>
            <li className='logoList'>
              <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => { console.log("Google Login Failed") }}
              text="signup_with"
              /></li>
          </ul>
      </div>
    </div>
    </section>
    </>
  );
};

export default Auth;
