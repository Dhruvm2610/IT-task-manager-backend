"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
require("./models/User");
require("./models/Task");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
db_1.default.authenticate()
    .then(() => {
    console.log("Database connected successfully");
    return db_1.default.sync();
})
    .then(() => {
    console.log("Tables created successfully");
})
    .catch((err) => {
    console.log("Database error:", err);
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});
