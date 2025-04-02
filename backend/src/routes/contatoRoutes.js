import express from 'express';
import contatoController from '../controllers/contatoController.js';

const router = express.Router();

router.get('/',contatoController.getAllUsers);
router.get('/:id',contatoController.getUserById);
router.post('/',contatoController.postUser);
router.put('/:id',contatoController.updateUser);
router.delete('/:id',contatoController.deleteUser);

export default router;