import { sendMail } from '../middleware/sendMail.js';
import userModel from '../models/userModels.js';
import otpModel from '../models/otpModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import productModel from '../models/ProductModel.js';



export const register = async(req, res) => {
    const {email} = req.body;
    const data = await userModel.findOne({ email });
    if(data){
        return res.status(200).json({ message: "User already exists" });
    }else{
        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const user = new otpModel({
            email,
            otp: hashedOtp
        });
        user.save();
        const subject = " U/FASHION OTP Verification";
        const htmlCode = `<div class="container">
                          <h1>OTP Verification</h1>
                          <p>Your (One-Time Password) for your account verification is.</p>
                          <p class="otp">${otp}</p> 
                        </div>`
        sendMail(email,subject,htmlCode);
        setTimeout(async () => {
          await otpModel.deleteOne({ email });
        }, 60000); // 60000 ms = 1 minute 
        console.log(`OTP sent : ${otp}`);
        res.status(200).json({ message: "OTP sent successfully"});   
    }
}

export const googleRegister = async(req, res) => {
  try {
    let token ;
    
  const { email, name, googleId } = req.body;
  const exsistingUser = await userModel.findOne({ email });
  if(exsistingUser){
    if(!exsistingUser.googleId){
      const hashGoogleId = await bcrypt.hash(googleId, 10);
      exsistingUser.googleId = hashGoogleId;
      await exsistingUser.save();
      token = jwt.sign(
        {
          id: exsistingUser._id,
          email: exsistingUser.email,
          role: exsistingUser.role,
        },
        process.env.Jwt_Sec,
        { expiresIn: "1d" }
      );
    }else{
      return res.status(200).json({ message: "User already exists" });
    }
  }else{
    const hashGoogleId = await bcrypt.hash(googleId, 10);
    const newUser = new userModel({
      name,
      email,
      password: "",
      googleId: hashGoogleId
    });
    await newUser.save();
    token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.Jwt_Sec,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ message: "User registered successfully and logged in" ,token});
  }
  }catch (error) {
    console.error(error);
    res.status(400).json({ message: "Sign up failed" });
  }
}

export const verifyUser = async(req, res) => {
    const { name, email, password, otp } = req.body;
    const user = await otpModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        message: "OTP not found",
      });
    }
    const isOtpValid = await bcrypt.compare(otp.toString(), user.otp);
    if (!isOtpValid) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }
    const existing = await userModel.findOne({ email });
    if(existing){
      if(!existing.password){
        const hashPassword = await bcrypt.hash(password, 10);
        existing.password = hashPassword;
        await existing.save();
      }else{
        return res.status(200).json({ message: "User already exists" });
      }
    }else{
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        googleId: "",
      });
      await newUser.save();
      await otpModel.deleteOne({ email }); 
      res.status(200).json({ message: "User registered successfully"}); 
    }
}

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const user = new otpModel({
            email,
            otp: hashedOtp
        });
        user.save();
        const subject = " U/FASHION OTP Verification";
        const htmlCode = `<div class="container">
                          <h1>OTP Verification</h1>
                          <p>Your (One-Time Password) for your account verification is.</p>
                          <p class="otp">${otp}</p> 
                        </div>`
        sendMail(email,subject,htmlCode);
        setTimeout(async () => {
          await otpModel.deleteOne({ email });
        }, 60000); // 60000 ms = 1 minute 
        console.log(`OTP sent : ${otp}`);
        res.status(200).json({ message: "OTP Resend successfully"});  
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }); 
        console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.Jwt_Sec,
        { expiresIn: "1d" }
      );
  
      res.status(200).json({
        message: "Login successful",token});
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
}

export const googleLogin = async (req, res) => {
  const { email, googleId } = req.body;
  const user = await userModel.findOne({ email });

  if(!user){
    return res.status(404).json({ message: "User not found" });
  }
  const isGoogleIdValid = await bcrypt.compare(googleId, user.googleId);
  if (!isGoogleIdValid) {
    return res.status(400).json({
      message: "Invalid Google ID",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.Jwt_Sec,
    { expiresIn: "1d" }
  );
  res.status(200).json({ message: "Login successful", token });
}

export const forgotPassword = async (req, res) => {
  try {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ status : "error" ,message: "User not found" });
  }
  const token = jwt.sign({email}, process.env.Jwt_Sec, { expiresIn: "5d" }
  );
  const htmlCode = `<div class="container">
                <h1>U/FASHION Password Reset</h1>
                <p>Your (One-Time Reset-link) for your account is.</p>
                <p class="otp"><a href="http://localhost:5173/reset-password/${token}" target="_blank">Reset here !</a></p> 
                </div>`;
  sendMail(email, "U/FASHION Password Reset", htmlCode);
  res.status(200).json({ message: "Reset link sent successfully", token});  
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {token, password, confirmPassword } = req.body;
    console.log(token, password, confirmPassword);
    if (password !== confirmPassword) {
      return res.json({status: "error",  message: "Passwords do not match" });
    }
    const decoded = jwt.verify(token, process.env.Jwt_Sec);
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword }
    );

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(400).json({status: "error",  message: "Invalid or expired token" });
  }
}

export const manageAccount = async (req, res) => {
  try {
    const { email } = req.body;
  const user = await userModel.findOne({email});
  if(!user){
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
  } catch (error) {
   res.status(500).json({ message: "Server error" }); 
  }
}

export const saveAddress5 = async(req,res) =>{
  try {
    const { email } = req.body;
    const address = JSON.parse(req.body.address); // address sent as stringified JSON

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Cloudinary URL (multer-storage-cloudinary puts it here)
    const imageUrl = req.file.path;
    console.log(imageUrl);
    console.log(req.file.path);
    
    

    // Update user with new address & profile image
    const userAddress = await userModel.findOneAndUpdate({ email },{ address, imageUrl });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: userAddress,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
}



export const saveAddress = async (req, res) => {
  try {
    const { email } = req.body;
    const address = req.body.address;
    
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // helper to upload buffer to Cloudinary via upload_stream
    const uploadFromBuffer = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

    const result = await uploadFromBuffer(req.file.buffer);

    // secure_url is what you want to save
    const imageUrl = result.secure_url;
    console.log(imageUrl);

    // update user and return updated document
    const updatedUser = await userModel.findOneAndUpdate({ email },{  address ,imageUrl },);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("saveAddress error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

export const fetchProductDesc = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
}

// ✅ Get related products (same category)
export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch products of same category, excluding current product
    const relatedProducts = await productModel.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(6);

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Server error while fetching related products" });
  }
};