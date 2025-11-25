import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./lib/env.js";
import { socketAuthMiddleware } from "./middleware/socket.auth.middleware.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

//apply authentication middleare on all soclket connections
io.use(socketAuthMiddleware);

//store online user
const userSocketMap = {}; //{userId:SocketId}

io.on("connection", (socket) => {
  console.log("A User connected", socket.user.fullname);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //io.emit() is useed to send events to all connected Clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //with socket.on we listen to events from clients
  socket.on("disconnect", () => {
    console.log("A user disconectd");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
