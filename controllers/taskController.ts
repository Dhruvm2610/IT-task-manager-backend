import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, createdByManagerId } = req.body;

    const manager: any = await User.findByPk(createdByManagerId);

    if (!manager || manager.role !== "Manager") {
      return res.status(400).json({
        message: "Creator must be Manager",
      });
    }

    const task = await Task.create({
      title,
      description,
      createdByManagerId,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

const assignTask = async (req: Request, res: Response) => {
  try {
    const { assignedEmployeeId } = req.body;

    const task: any = await Task.findByPk(Number(req.params.id));
    const employee: any = await User.findByPk(assignedEmployeeId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (!employee || employee.role !== "Employee") {
      return res.status(400).json({
        message: "Assigned user must be Employee",
      });
    }

    task.assignedEmployeeId = assignedEmployeeId;
    await task.save();

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({
      message: "Error assigning task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();

    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(Number(req.params.id));

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
};

const startTask = async (req: Request, res: Response) => {
  try {
    const task: any = await Task.findByPk(Number(req.params.id));

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = "IN_PROGRESS";
    await task.save();

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({
      message: "Error starting task",
      error: error.message,
    });
  }
};

const completeTask = async (req: Request, res: Response) => {
  try {
    const task: any = await Task.findByPk(Number(req.params.id));

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = "COMPLETED";
    await task.save();

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({
      message: "Error completing task",
      error: error.message,
    });
  }
};

const reviewTask = async (req: Request, res: Response) => {
  try {
    const { status, reviewedByHeadId } = req.body;

    const task: any = await Task.findByPk(Number(req.params.id));
    const head: any = await User.findByPk(reviewedByHeadId);

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
  } catch (error: any) {
    res.status(500).json({
      message: "Error reviewing task",
      error: error.message,
    });
  }
};

export {
  createTask,
  assignTask,
  getAllTasks,
  getTaskById,
  startTask,
  completeTask,
  reviewTask,
};