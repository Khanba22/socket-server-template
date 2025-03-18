"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSocket } from "./SocketContext";
import { useRoom } from "./RoomContext";
import { useUser } from "./UserContext";

interface MessageProviderProps {
  children: ReactNode;
}

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

interface IMessages {
  messages: Message[];
  sendMessage: (message: string) => void;
}
const MessageContext = createContext<IMessages>({
    messages:[],
    sendMessage:()=>{}
});

export const MessageContextProvider = ({ children }: MessageProviderProps) => {
  const socket = useSocket();
  const user = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const room = useRoom();

  const sendMessage = (message: string) => {
    console.log("Sending Message")
    socket?.emit("send-message", {
      room: room?.roomId,
      sender: user.username,
      message: message,
    });
  };

  useEffect(() => {
    socket?.on("message", ({ sender, message, timestamp }) => {
      console.log(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, message, timestamp },
      ]);
    });
  }, [socket]);

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  if (!MessageContext) {
    throw new Error("No Wrapper For Message Context");
  }
  return useContext(MessageContext);
};
