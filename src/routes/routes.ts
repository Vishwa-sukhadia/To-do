import express, { Router } from "express";

import usersRouter from './user';
import todoRouter from './todo';


const router: Router = express.Router();

router.use(usersRouter);
router.use(todoRouter);



export default router;
