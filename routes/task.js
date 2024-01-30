import express from "express";
const router = express.Router();
import {
  createTask,
  getAllTasks,
  markTaskAsCompleted,
  editTask,
  deleteTask,
} from "../controllers/task.js";

// Routes

// Create a new task
router.post("/", createTask);

// Get a list of all tasks
router.get("/", getAllTasks);

// Mark a task as completed
router.patch("/:id/complete", markTaskAsCompleted);

// Edit task details
router.put("/:id", editTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
