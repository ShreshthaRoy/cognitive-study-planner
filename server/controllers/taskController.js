const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, subject, priority, deadline } = req.body;

    const task = new Task({
      user: req.user.id,
      title,
      subject,
      priority,
      deadline
    });

    await task.save();
    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};