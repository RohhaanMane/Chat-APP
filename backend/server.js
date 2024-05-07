import path from "path";
import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongodb from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist"))); // to serve static files such as HTML,CSS, images

// with this we can run our frontend from server side as well
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// root route http://localhost:5000/
// app.get("/", (req, res)=>{
//     res.send("Hello Rohan");
// })

server.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server is running on Port ${PORT}`);
});
