import express from 'express';
import {
  createRazorpayOrder,
  placeOrder,
  showAddresses,
  verifyPayment
} from '../controllers/orderControl.js';

const router = express.Router();

router.get('/address', showAddresses);
router.post('/place-order', placeOrder);
router.post('/razorpay/create-order', createRazorpayOrder);
router.post('/razorpay/verify-payment', verifyPayment);

export default router;