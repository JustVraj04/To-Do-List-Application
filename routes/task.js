import express from "express";
const router = express.Router();
import * as taskController from "../controllers/task.js";
// Routes

// Create a new task
router.post("/", taskController.createTask);

// Get a list of all tasks
router.get("/", taskController.getAllTasks);

// Mark a task as completed
router.patch("/:id/complete", taskController.markTaskAsCompleted);

// Edit task details
router.put("/:id", taskController.editTask);

// Delete a task
router.delete("/:id", taskController.deleteTask);

export default router;
