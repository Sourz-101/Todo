import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({ message: "Unauthorized - Cookie Not Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded._id).select("-password");
    
    if(!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: `Error in authentication middleware -> ${error.message}` });
  }
}