import { createContext } from "react";
import { IPlayer } from "@/interfaces/Player";

const PlayerContext = createContext<IPlayer | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlayerContext.Provider value={null}>{children}</PlayerContext.Provider>
  );
};

const usePlayer = () => {
  if (!PlayerContext) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return PlayerContext;
};

export default usePlayer;
