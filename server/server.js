import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

import authRoute from "./Routes/AuthRoute.js";
import messageRoute from "./Routes/MessageRoute.js";
import { connectDB } from "./lib/DB.js";

const app = express();
const server = http.createServer(app);
const port=process.env.PORT || 5000; 


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"]
  })
);

app.use(express.json({ limit: "4mb" }));


export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

export const userSocketMap = {};

io.on("connection", socket => {
  const userId = socket.handshake.query.userId;
  console.log("Connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});


app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);


await connectDB();

server.listen(port, () => console.log("Server started on port 5000"));
