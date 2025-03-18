import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomController } from "./controllers/roomController";
import { messageController } from "./controllers/messageController";
import { gameController } from "./controllers/gameController";
import { playerController } from "./controllers/playerController";

const RoomMap = new Map();
const GameMap = new Map();
export {RoomMap,GameMap}


const app = express();
const server = createServer(app);
const PORT = 3001;
app.use(cors())
app.use(express.json()); // ✅ Add this line
app.use(express.urlencoded({ extended: true })); // Optional: For URL-encoded form data

console.log(process.env.JWT_SECRET,"JWT SECRET")
// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Allow Next.js frontend
    methods: ["GET", "POST"]
  }
});

app.get("/",(req,res)=>{
  res.send(`Server Active On Port ${PORT}`)
})


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Received:", msg);
    io.emit("message", msg);  // Broadcast message
  });
  roomController(io,socket);
  gameController(io,socket);
  playerController(socket,io);
  messageController(io,socket)
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Socket.o Server running on http://localhost:${PORT}`);
});

