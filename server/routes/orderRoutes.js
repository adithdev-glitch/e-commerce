import express from 'express';
import { placeOrder, showAddresses } from '../controllers/orderControl.js';

const router = express.Router();

router.get('/address', showAddresses);
router.post('/place-order', placeOrder);

export default router;