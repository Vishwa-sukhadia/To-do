import express, { Router } from "express";
import { userController } from "../controllers";

const router: Router = express.Router();

router.post("/create_user", userController.createUser);
router.post("/login", userController.userLogin);

export default router;
