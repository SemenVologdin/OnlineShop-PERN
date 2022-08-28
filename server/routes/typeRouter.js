import { Router } from "express";
import Type from "../controllers/Type.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('/', checkRoleMiddleware( 'ADMIN' ) , Type.create)

router.get('/', Type.getAll)

export default router;