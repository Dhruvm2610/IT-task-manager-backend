"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("db_it", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
exports.default = db; //ready to export in other files.
