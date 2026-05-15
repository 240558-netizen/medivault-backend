import User from "../models/User.js";

export const getAllProfiles = async (req, res) => {
  try {
    // Password hide karke saara data nikalna
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};