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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: `please fill all the fields` });
    }

    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({ 
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

    console.log(`${user.name} logged in successfully with emai: ${user.email}`);

  } catch (error) {
    res.status(500).json({ message: `Error in login controller -> ${error.message}` });
  }
}

export const logout = async (req, res) => {
 try {
   res
     .status(200)
     .cookie("token", "", {
       expires: new Date(0),
     })
     .json({ 
       message: "Logged out successfully",
     });
  console.log(`${req.user.name} logged out successfully`);
 } catch (error) {
   res.status(500).json({ message: `Error in logout controller -> ${error.message}` });
 }
}