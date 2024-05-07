import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

// this will give socket id of receiver when we pass receivers id
export const getReceiverSocketId = (receiverId) => {                    // we'll be using it in message controller
    return userSocketMap[receiverId];
}

// for online status
const userSocketMap = {}; // { userId : socketId }

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId; // get userId sent by frontend (socketContext)

    if (userId != "undefined") userSocketMap[userId] = socket.id;   // update the map, since it is updated we need to send and event to all connected clients

    // io.emit() is used to send event to all connected clients 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));          // sends who is online and who is offline

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.io);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));          // sicnce userSocketMap updated again send event to clients
        
    });
});

export { app, io, server };


// socket.emit()   -> send event - to all clinets
// socket.on()     -> listen those events