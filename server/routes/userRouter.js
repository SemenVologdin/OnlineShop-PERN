import { Router } from "express";

import User from '../controllers/User.js';

const router = new Router();

router.post('/registration', User.registration)
router.post('/login', User.login)

router.get('/auth', User.check)

export default router;