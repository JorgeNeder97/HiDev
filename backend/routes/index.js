import express from 'express';
import indexController from '../controllers/indexController.js';
const router = express.Router();


router.get('/', indexController.sayHi);

router.post('/login', indexController.login);

router.get('/verify', indexController.verifyToken);

export default router;
