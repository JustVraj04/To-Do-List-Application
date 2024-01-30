import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const foundTask = await Task.findOne({ title });

    // Validation: Ensure that task titles are not empty
    if (!title) {
      return res.status(400).json({ error: "Task title cannot be empty." });
    }
    if (foundTask) {
      return res
        .status(400)
        .json({ error: "Task with same title already exists." });
    }

    const task = new Task({ title, description });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markTaskAsCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    // Validation: Ensure that users can't mark a task as complete if it's already marked as such
    if (!task || task.completed) {
      return res
        .status(400)
        .json({ error: "Task not found or already completed." });
    }

    task.completed = true;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;

    // Validation: Ensure that task titles are not empty
    if (!title) {
      return res.status(400).json({ error: "Task title cannot be empty." });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );

    // Handle task not found
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    // Handle task not found
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};
