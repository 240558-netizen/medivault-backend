import express from "express";
import {
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all records
router.get("/", protect, getRecords);

// Add record
router.post("/", protect, addRecord);

// Update record
router.put("/:id", protect, updateRecord);

// Delete record
router.delete("/:id", protect, deleteRecord);

export default router;