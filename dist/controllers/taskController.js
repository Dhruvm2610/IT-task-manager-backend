"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewTask = exports.completeTask = exports.startTask = exports.getTaskById = exports.getAllTasks = exports.assignTask = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const User_1 = __importDefault(require("../models/User"));
const createTask = async (req, res) => {
    try {
        const { title, description, createdByManagerId } = req.body;
        const manager = await User_1.default.findByPk(createdByManagerId);
        if (!manager || manager.role !== "Manager") {
            return res.status(400).json({
                message: "Creator must be Manager",
            });
        }
        const task = await Task_1.default.create({
            title,
            description,
            createdByManagerId,
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message,
        });
    }
};
exports.createTask = createTask;
const assignTask = async (req, res) => {
    try {
        const { assignedEmployeeId } = req.body;
        const task = await Task_1.default.findByPk(Number(req.params.id));
        const employee = await User_1.default.findByPk(assignedEmployeeId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error assigning task",
            error: error.message,
        });
    }
};
exports.assignTask = assignTask;
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.findAll();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message,
        });
    }
};
exports.getAllTasks = getAllTasks;
const getTaskById = async (req, res) => {
    try {
        const task = await Task_1.default.findByPk(Number(req.params.id));
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching task",
            error: error.message,
        });
    }
};
exports.getTaskById = getTaskById;
const startTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByPk(Number(req.params.id));
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        task.status = "IN_PROGRESS";
        await task.save();
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({
            message: "Error starting task",
            error: error.message,
        });
    }
};
exports.startTask = startTask;
const completeTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByPk(Number(req.params.id));
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        task.status = "COMPLETED";
        await task.save();
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({
            message: "Error completing task",
            error: error.message,
        });
    }
};
exports.completeTask = completeTask;
const reviewTask = async (req, res) => {
    try {
        const { status, reviewedByHeadId } = req.body;
        const task = await Task_1.default.findByPk(Number(req.params.id));
        const head = await User_1.default.findByPk(reviewedByHeadId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error reviewing task",
            error: error.message,
        });
    }
};
exports.reviewTask = reviewTask;
