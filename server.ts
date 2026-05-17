import express from "express";
import db from "./config/db";

import "./models/User";
import "./models/Task";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

db.authenticate()
    .then(() => {
    console.log("Database connected successfully");
    return db.sync();
  })
    .then(() => {
    console.log("Tables created successfully");
  })
    .catch((err: Error) => {
    console.log("Database error:", err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});