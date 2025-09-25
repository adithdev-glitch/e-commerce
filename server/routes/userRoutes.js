import express from 'express';
import upload from '../middleware/multer.js';
import { forgotPassword, googleLogin, googleRegister, login, manageAccount, register, resendOtp, resetPassword, saveAddress, verifyUser } from '../controllers/userControl.js';

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyUser);
router.post("/login", login);
router.post("/google-register", googleRegister);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);
router.post("/account", manageAccount);
router.post("/upload", upload.single("profilePic"),saveAddress);

export default router;