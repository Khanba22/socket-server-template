"use client";
import { IGame } from "@/interfaces/Game";
import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps } from "@/interfaces/ContextProps";
import { useSocket } from "./SocketContext";
import { useRouter } from "next/navigation";
import { useRoom } from "./RoomContext";

const GameContext = createContext<IGame>({
  id: "",
  players: [],
  currentTurn: 0,
  startGame: () => {},
});

export const GameContextProvider = ({ children }: ContextProps) => {
  const socket = useSocket();
  const room = useRoom();
  const router = useRouter();
  const [game, setGame] = useState({
    id: "",
    players: [],
    currentTurn: 0,
  });

  const startGame = () => {
    socket?.emit("create-game", {
      roomCode: room?.joinCode,
    });
  };

  useEffect(() => {
    socket?.on("game-started", ({ newGame }) => {
      setGame(newGame);
      router.push("/game");
    });
  });

  return (
    <GameContext.Provider
      value={{
        ...game,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
