import { Router } from 'express';
import { passLocationsFromEnum , fetchCases,getLawyers,getClientIdFromUserId,getAppointmentsByUserId,addAppointment } from '../controllers/clientController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/getLocations', authenticateJWT,passLocationsFromEnum);
router.post('/getClientIdFromUserId/', authenticateJWT,getClientIdFromUserId);
router.post('/addAppointment', authenticateJWT,addAppointment);
router.post('/getAppointmentsByUserId', authenticateJWT,getAppointmentsByUserId);
router.get('/getLawyers', authenticateJWT,getLawyers);
router.post('/fetchCases', authenticateJWT,fetchCases);

export default router;