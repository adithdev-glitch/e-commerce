import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct, getAdmin } from '../controllers/adminControl.js';
import { isAdmin } from '../middleware/isAdmin.js';


const router = express.Router();

router.get("/profile", isAdmin, getAdmin);
router.post('/add-product',isAdmin, upload.array("images",4), addProduct);


export default router;