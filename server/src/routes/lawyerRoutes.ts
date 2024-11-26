import { Router } from 'express';
import { getLawyerFromUserId,addCase,fetchCases,updateCase,fetchCaseNotesAndConcatenate,getCases } from '../controllers/lawyerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/getLawyerFromUserId', authenticateJWT, getLawyerFromUserId);
router.post('/addCase', authenticateJWT, addCase);
router.post('/fetchCases', authenticateJWT, fetchCases);
router.put('/updateCase', authenticateJWT, updateCase);
router.post('/fetchCaseNotesAndConcatenate', authenticateJWT, fetchCaseNotesAndConcatenate);
router.post('/getCases', authenticateJWT, getCases);

export default router;