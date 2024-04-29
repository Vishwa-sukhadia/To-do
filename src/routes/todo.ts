import express, { Router } from "express";
import { todoController } from "../controllers";
import verifyToken from "../middleware/auth"


const router: Router = express.Router();

router.post('/todo',verifyToken,todoController.createTodo);
router.put('/todo/:id',verifyToken,todoController.updateTodo);
router.delete('/todo/:id',verifyToken,todoController.deleteTodo);




export default router;