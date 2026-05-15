import express from 'express';
const router = express.Router();
// ADD THE NEW IMPORTS BELOW
import { 
  bookAppointment, 
  getAppointments, 
  updateAppointment, 
  deleteAppointment 
} from '../controllers/appointmentController.js'; 
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

export default router;