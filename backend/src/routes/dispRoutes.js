import express from 'express';
import dispController from '../controllers/dispController.js';
const router4 = express.Router();

router4.get('/',dispController.getLivrosDisponiveis);

export default router4;