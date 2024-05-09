import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/authentication.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    var user = await User.findOne({ email })
    if( user ) {
      console.log(user.email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    

    user = await User.create({ name, email, password: hashedPassword });
    
    generateToken(user._id, res);

    res.status(201).json({ 
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
    });


  } catch (error) {
    res.status(500).json({ message: `Error in register controller -> ${error.message}` });
  }
};