import { Router } from "express";

import brandRouter from './brandRouter.js';
import deviceRouter from './deviceRouter.js';
import typeRouter from './typeRouter.js';
import userRouter from './userRouter.js';

const router = new Router();

router
    .use('/user', userRouter)
    .use('/type', typeRouter)
    .use('/brand', brandRouter)
    .use('/device', deviceRouter);

export default router;