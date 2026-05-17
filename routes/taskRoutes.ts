import express from "express";
import {
  createTask,assignTask,
  getAllTasks,
  getTaskById,
  startTask,
  completeTask,
  reviewTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", createTask);
router.patch("/:id/assign", assignTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.patch("/:id/start", startTask);
router.patch("/:id/complete", completeTask);
router.patch("/:id/review", reviewTask);

export default router;