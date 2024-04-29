import express, { Router } from "express";
import { todoController } from "../controllers";
import verifyToken from "../middleware/auth";

const router: Router = express.Router();

router.post("/todo", verifyToken, todoController.createTodo);
router.put("/todo/:id", verifyToken, todoController.updateTodo);
router.delete("/todo/:id", verifyToken, todoController.deleteTodo);
router.get("/todo", verifyToken, todoController.allTodo);
router.get("/single_todo/:id", verifyToken, todoController.singleTodo);

export default router;
