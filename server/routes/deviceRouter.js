import { Router } from "express";
import Device from "../controllers/Device.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('/', checkRoleMiddleware( 'ADMIN' ), Device.create);

router.get('/', Device.getAll);
router.get('/:id', Device.getOne);

export default router;