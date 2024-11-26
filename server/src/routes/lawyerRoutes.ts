import { Router } from 'express';
import { getLawyerFromUserId,addCase,getAppointmentByLawyerId,updateAppointment,fetchCases,updateCase,fetchCaseNotesAndConcatenate,getCases } from '../controllers/lawyerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getLawyerFromUserId', authenticateJWT, getLawyerFromUserId);
router.post('/addCase', authenticateJWT, addCase);
router.post('/fetchCases', authenticateJWT, fetchCases);
router.put('/updateCase', authenticateJWT, updateCase);
router.post('/fetchCaseNotesAndConcatenate', authenticateJWT, fetchCaseNotesAndConcatenate);
router.post('/getCases', authenticateJWT, getCases);
router.post('/getAppointmentByLawyerId', authenticateJWT, getAppointmentByLawyerId);
router.post('/updateAppointment', authenticateJWT, updateAppointment);

export default router;