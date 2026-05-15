const express = require("express"); //importing express framework
const db = require("./config/db"); 

require("./models/User");
require("./models/Task");

const userroutes = require("./routes/userRoutes");
const taskroutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/users", userroutes);
app.use("/tasks", taskroutes);

db.authenticate()
.then(() => {
    console.log("Databse connected successfully");
    return db.sync();
})
    .then(() => {
        console.log("Tables created successfully");
})
    .catch((err) => {
        console.log("Database error:", err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is runnin on port 3000");
});  //starting the server on the local machine, port 3000.
