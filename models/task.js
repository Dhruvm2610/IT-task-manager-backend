const { DataTypes } = require('sequelize'); //importing DataTypes

const db = require("../config/db"); //importing the database connection from config/db.js

const User = require("./User"); //importing User model to connect user and task models.


const Task = db.define("Task", {

    //Created title field to enter the name of the task given to employees.

    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    //Created description field to enter details about the task.

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    //Created status field for tracking the progress of tasks.

    status: {
        type: DataTypes.ENUM(
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
            "APPROVED",
            "REJECTED"
        ),
        allowNull: true,
        defaultValue: "PENDING", //kept default value as PENDING when a task is given. 
    },      
});

Task.belongsTo(User, { as: "assignedEmployee"});
Task.belongsTo(User, { as: "createdByManager"});
Task.belongsTo(User, {as: "approvedByHead" });

module.exports = Task; //ready to export in other files.