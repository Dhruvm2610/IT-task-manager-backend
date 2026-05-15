const express = require("express");
const router = express.Router();

const {
    createTask, getAllTasks, getTaskById, startTask, completeTask, reviewTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.patch("/:id/start", startTask);
router.patch("/:id/complete", completeTask);
router.patch("/:id/review", reviewTask);


module.exports = router;