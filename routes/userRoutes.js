import express from "express";
import { getAllProfiles } from "../controllers/userController.js";

const router = express.Router();

// Sirf GET ki permission hai, baaki sab band
router.get("/", getAllProfiles);

export default router;