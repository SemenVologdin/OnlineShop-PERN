import { Router } from "express";

import User from '../controllers/User.js';
import authMilldleware from "../middleware/authMilldleware.js";
const router = new Router();

router.post('/registration', User.registration);
router.post('/login', User.login);

router.get('/auth', authMilldleware, User.check);

export default router;