import express from 'express';
import upload from '../middleware/multer.js';
import { fetchProductDesc, fetchProducts, forgotPassword, getRelatedProducts
    , googleLogin, googleRegister, login, manageAccount, register, resendOtp,
     resetPassword, saveAddress, sideBarCategories, verifyUser } from '../controllers/userControl.js';

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
router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductDesc);
router.get('/products/:id/related', getRelatedProducts);
router.get("/categories", sideBarCategories);


export default router;