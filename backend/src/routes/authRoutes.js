import express from 'express';
import { loginDemoUser, getCurrentUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginDemoUser);
router.get('/me', getCurrentUser);
router.get('/logout', logoutUser);

export default router;
