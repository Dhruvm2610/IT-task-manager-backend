"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.post("/", taskController_1.createTask);
router.patch("/:id/assign", taskController_1.assignTask);
router.get("/", taskController_1.getAllTasks);
router.get("/:id", taskController_1.getTaskById);
router.patch("/:id/start", taskController_1.startTask);
router.patch("/:id/complete", taskController_1.completeTask);
router.patch("/:id/review", taskController_1.reviewTask);
exports.default = router;
