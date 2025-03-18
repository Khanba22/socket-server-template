"use client";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import React, { useCallback, useState } from "react";

const Home = () => {
  const [username, setUserName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const socket = useSocket();
  const { setUsername } = useUser();

  const createRoom = useCallback(() => {
    if (username.trim() === "") return;
    setUsername(username);
    socket?.emit("create-room", { username });
  }, [username, socket, setUsername]);

  const joinRoom = () => {
    if (joinCode.trim().length === 8 && username.trim() !== "") {
      setUsername(username);
      socket?.emit("join-room", { joinCode, username });
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="w-2/4 h-auto px-10 py-8 flex flex-col justify-center bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-slate-50 mb-6 text-center text-6xl font-bold">
          The Last Take
        </h1>

        {/* Username Input (Required for both Create & Join) */}
        <input
          className="text-slate-50 my-4 text-center border-none rounded-3xl w-full bg-transparent border border-yellow-200 p-3 text-2xl focus:outline-none"
          type="text"
          placeholder="Enter Your Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        {/* Room Code Input (Only for Join Room) */}
        {!isCreating && (
          <input
            className="text-slate-50 my-4 text-center border-none rounded-3xl w-full bg-transparent border border-yellow-200 p-3 text-2xl focus:outline-none"
            type="text"
            placeholder="Enter Room Code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
        )}

        {/* Join Room Button (Only if not Creating) */}
        {!isCreating && (
          <button
            disabled={joinCode.trim().length !== 8 || username.trim() === ""}
            className="w-full my-4 p-3 text-2xl font-semibold bg-blue-600 rounded-3xl hover:bg-blue-700 disabled:opacity-50"
            onClick={joinRoom}
          >
            Join Room
          </button>
        )}

        {/* Create Room Button */}
        <button
          className="w-full my-4 p-3 text-2xl font-semibold rounded-3xl border border-pink-400 hover:bg-gray-700"
          onClick={() => {
            if (isCreating) {
              createRoom();
            } else {
              setUserName("");
              setJoinCode("");
              setIsCreating(true);
            }
          }}
        >
          {isCreating ? "Create Room" : "Switch to Create Room"}
        </button>

        {/* Go Back Button (Only in Create Room Mode) */}
        {isCreating && (
          <button
            className="w-full my-4 p-3 text-2xl font-semibold bg-gray-700 rounded-3xl hover:bg-gray-800"
            onClick={() => {
              setIsCreating(false);
              setUserName("");
              setJoinCode("");
            }}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
