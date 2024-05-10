import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      user: req.user,
    });

    res.status(201).json({ message: "Task created successfully" });

    await task.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, isCompleted} = req.body;

    const task = await Task.findById(id);
    console.log(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if(title) task.title = title;
    if(isCompleted) task.isCompleted = isCompleted;

    await task.save();

    res.status(200).json({ message: "Task updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};