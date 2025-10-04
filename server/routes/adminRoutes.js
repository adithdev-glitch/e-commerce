import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct } from '../controllers/adminControl.js';

const router = express.Router();

router.post('/add-product', upload.array("images",4), addProduct);


export default router;