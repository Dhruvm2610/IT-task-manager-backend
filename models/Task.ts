import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./User";

const Task = db.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM(
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
      "APPROVED",
      "REJECTED"
    ),
    defaultValue: "PENDING",
  },
});

Task.belongsTo(User, { as: "assignedEmployee" });
Task.belongsTo(User, { as: "createdByManager" });
Task.belongsTo(User, { as: "approvedByHead" });

export default Task;