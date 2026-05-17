"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User"));
const Task = db_1.default.define("Task", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
    },
});
Task.belongsTo(User_1.default, { as: "assignedEmployee" });
Task.belongsTo(User_1.default, { as: "createdByManager" });
Task.belongsTo(User_1.default, { as: "approvedByHead" });
exports.default = Task;
