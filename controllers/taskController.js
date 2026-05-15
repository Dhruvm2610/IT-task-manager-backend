const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const { title, description, assignedEmployeeId, createdByManagerId } =
      req.body;

    const employee = await User.findByPk(assignedEmployeeId);
    const manager = await User.findByPk(createdByManagerId);

    if (!employee || employee.role !== "Employee") {
      return res.status(400).json({
        message: "Assigned user must be Employee",
      });
    }

    if (!manager || manager.role !== "Manager") {
      return res.status(400).json({
        message: "Task creator must be Manager",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedEmployeeId,
      createdByManagerId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
};

const startTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = "IN_PROGRESS";
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error starting task",
      error: error.message,
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = "COMPLETED";
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error completing task",
      error: error.message,
    });
  }
};

const reviewTask = async (req, res) => {
  try {
    const { status, reviewedByHeadId } = req.body;

    const task = await Task.findByPk(req.params.id);
    const head = await User.findByPk(reviewedByHeadId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (!head || head.role !== "Head") {
      return res.status(400).json({
        message: "Reviewer must be Head",
      });
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
      return res.status(400).json({
        message: "Status must be APPROVED or REJECTED",
      });
    }

    task.status = status;
    task.reviewedByHeadId = reviewedByHeadId;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error reviewing task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask, getAllTasks, getTaskById, startTask, completeTask,reviewTask,
};