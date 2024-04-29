import express, { Router } from "express";

import usersRouter from './user';


const router: Router = express.Router();

router.use(usersRouter);



export default router;