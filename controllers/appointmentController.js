import Appointment from '../models/Appointment.js'; // Ensure the .js is there

// ... the rest of your functions

export const bookAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment({ ...req.body, user: req.user.id });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ... existing bookAppointment and getAppointments

// UPDATE Appointment
// Add these to your existing appointmentController.js

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the appointment belongs to the logged-in user
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedAppt = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This returns the modified document rather than the original
    );

    res.status(200).json(updatedAppt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the appointment belongs to the user
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await appointment.deleteOne();
    res.status(200).json({ message: "Appointment removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};