// controllers/userController.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Controller functions

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token as a response
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "You are not logged in." });
    }

    // delete token cookie
    res.clearCookie("token").send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, logout };
