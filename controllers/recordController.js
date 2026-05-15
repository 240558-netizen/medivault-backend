import Record from "../models/Record.js";

// 🔹 Get All Records
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Add Record
// Inside recordController.js
export const addRecord = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Check if data exists
    if (!title || !description) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    const newRecord = new Record({
      title,
      description,
      user: req.user.id,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Record
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete Record
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await record.deleteOne();

    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};