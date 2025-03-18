import { Socket } from "socket.io";
import { v4 } from "uuid";

export class Room {
    socketId: string;
    createdAt: Date = new Date();
    creator: string;
    joinCode: string = v4().substring(0, 8);
    roomId: string;
    users: string[] = [];
    userToSocket: Map<string, string> = new Map();

    constructor(username: string, roomId: string, socket: Socket) {
        this.socketId = username;
        this.creator = username;
        this.userToSocket.set(username, socket.id);
        this.roomId = roomId;
        this.users.push(username);
    }

    getUserSocketId(username: string) {
        return this.userToSocket.get(username);
    }

    addUser(user: string, socketId: string) {
        if (this.users.includes(user)) {
            return;
        }
        this.userToSocket.set(user, socketId);
        this.users.push(user);
    }

    removeUser(user: string) {
        this.users = this.users.filter((u) => u !== user);
    }

    removeUserSocket(user: string) {
        this.userToSocket.delete(user);
    }

    getUsers() {
        return this.users;
    }

    getRoomId() {
        return this.roomId;
    }

    getSocketId() {
        return this.socketId;
    }
}
