import { Server, Socket } from "socket.io";


export const audioController = (io:Server,socket:Socket)=>{

    socket.on("connect-audio",({
        roomId,
        userId,
        audio
    })=>{
        console.log("User connected:", socket.id);
        socket.join(roomId);
        io.to(roomId).emit("connect-audio", {userId, audio});
    })

    socket.on("disconnect-audio",(
        {
            roomId,
            userId
        }
    )=>{
        console.log("User disconnected:", socket.id);
        socket.leave(roomId);
        io.to(roomId).emit("disconnect-audio", {userId});
    })
    
    socket.on("audio", (audio) => {
        console.log("Received:", audio);
        io.emit("audio", audio);  // Broadcast message
    });
}