"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

interface IRoom {
  socketId: string;
  createdAt: string;
  creator: string;
  joinCode: string;
  roomId: string;
  users: string[];
}

interface RoomProviderProps {
  children: React.ReactNode;
}

const RoomContext = createContext<null | IRoom>(null);

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [room, setRoom] = useState<IRoom>({
    socketId: "",
    createdAt: "",
    creator: "",
    joinCode: "",
    roomId: "",
    users: [],
  });
  const router = useRouter();

  const socket = useSocket();

  useEffect(() => {
    socket?.on("room-created", (newRoom: IRoom) => {
      console.log("Room Created", newRoom);
      setRoom(newRoom);
      router.push("/room");
    });

    socket?.on("leave-room", (newRoom: IRoom) => {
      setRoom(newRoom);
    });

    socket?.on("user-left", (newRoom: IRoom) => {
      console.log("User Left",newRoom)
      setRoom(newRoom);
    });

    socket?.on("room-joined", (newRoom: IRoom) => {
      console.log("Joined Room", newRoom);
      setRoom(newRoom);
      router.push("/room");
    });
  },[socket,router]);

  useEffect(() => {
    if (!room.roomId) {
      router.push("/");
    }
  }, []);

  return (
    <RoomContext.Provider value={{ ...room }}>{children}</RoomContext.Provider>
  );
};

export const useRoom = () => {
  if (!RoomContext) {
    throw new Error("Room Context Not Accessible");
  }
  return useContext(RoomContext);
};
