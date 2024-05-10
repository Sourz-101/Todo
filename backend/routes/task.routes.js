import { Router } from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controller/task.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = Router();


router.post("/new", isAuthenticated, createTask);

router.get("/all", isAuthenticated, getAllTasks);

router.put("/update/:id", isAuthenticated, updateTask);

router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;