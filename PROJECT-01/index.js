const express = require("express");

const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// CONNECTION
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
    console.log("Mongodb connected!")

);

// MIDDLEWARE 
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// ROUTES  

app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});

