import express from 'express';
import livroController from '../controllers/livroController.js';

const router2 = express.Router();

router2.get('/',livroController.getAllBook);
router2.get('/:id',livroController.getBookById);
router2.post('/',livroController.postBook);
router2.put('/:id',livroController.updateBook);
router2.delete('/:id',livroController.deleteBook);

export default router2;