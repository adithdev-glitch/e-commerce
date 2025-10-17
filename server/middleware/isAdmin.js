import jwt from 'jsonwebtoken';
import usermodel from "../models/userModels.js";
import "dotenv/config";

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.Jwt_Sec);
    const user = await usermodel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user; // Attach user to req for the next function
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};