import { Socket, Server } from "socket.io";
import { Room } from "../classes/Room";
import { RoomMap } from "../server";
import { v4 } from "uuid";

export const roomController = (io: Server, socket: Socket) => {
    socket.on("message", (msg) => {
        console.log("Received:", msg);
        io.emit("message", msg); // Broadcast message
    });

    socket.on("create-room", ({ username }) => {
        console.log("Creating room");
        const roomId = v4().substring(0, 9);
        const room = new Room(username, roomId, socket);
        room.addUser(username, socket.id);
        socket.join(roomId);
        // Ensure socket.data is properly initialized
        socket.data = { username, roomCode:room.joinCode };

        RoomMap.set(room.joinCode, room);
        console.log(RoomMap);
        io.to(roomId).emit("room-created", { ...room });
    });

    socket.on("join-room", ({ joinCode, username }) => {
        console.log(joinCode);
        const room = RoomMap.get(joinCode);

        console.log(room);
        if (!room) {
            socket.emit("room-not-found");
            return;
        }
        socket.data = { username, roomCode:room.joinCode };
        room.addUser(username, socket.id);
        socket.join(room.getRoomId());
        io.to(room.getRoomId()).emit("room-joined", { ...room });
    });

    socket.on("disconnect", () => {
        const { username, roomCode } = socket.data || {};
        console.log(`User disconnected: ${username || "unknown"},From Room ${roomCode}`);
        // Handle disconnection if socket.data was properly set
        const room = RoomMap.get(roomCode);
        console.log("Room in Disconnect Context",room)
        if (room) {
            room.removeUser(username);
            room.removeUserSocket(username);

            if (room.getUsers().length === 0) {
                RoomMap.delete(room.joinCode);
            } else {
                io.to(room.getRoomId()).emit("user-left", { ...room });
            }
        }
    });
};
 