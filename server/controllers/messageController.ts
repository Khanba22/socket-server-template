import { Server, Socket } from "socket.io";

export const messageController = (io: Server, socket: Socket) => {
  socket.on("send-message", ({ room, sender, message }) => {
    const timestamp = new Date().toTimeString()
    console.log(sender + " Said : " + message)
    io.to(room).emit("message", { sender, message, timestamp });
  });
};
