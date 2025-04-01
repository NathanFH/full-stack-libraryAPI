import express from 'express';
import locarController from '../controllers/locarController.js';
const router3 = express.Router();

router3.get('/',locarController.getAllLocacao);
router3.post('/',locarController.postLocacao);

export default router3;