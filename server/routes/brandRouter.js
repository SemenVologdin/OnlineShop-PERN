import { Router } from "express";
import Brand from "../controllers/Brand.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('/', checkRoleMiddleware( 'ADMIN' ), Brand.create);

router.get('/', Brand.getAll);

export default router;