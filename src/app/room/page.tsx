"use client";
import { useRoom } from "@/contexts/RoomContext";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useMessage } from "@/contexts/MessageContext";
import { useGame } from "@/contexts/GameContext";

const Page = () => {
  const room = useRoom();
  const game = useGame()
  const [typedMessage, setTypedMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const { messages, sendMessage } = useMessage();

  const toggleMessageScreen = () => {
    setShowMessages(!showMessages);
  };

  if (!room) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 relative">
      <h1 className="text-4xl font-bold mb-6">Room Details</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <p className="text-lg mb-2">
          <span className="font-semibold text-yellow-400">Creator:</span>{" "}
          {room.creator}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold text-yellow-400">Socket ID:</span>{" "}
          {room.socketId}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold text-yellow-400">Room ID:</span>{" "}
          {room.roomId}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold text-yellow-400">Join Code:</span>{" "}
          {room.joinCode}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold text-yellow-400">Created At:</span>{" "}
          {room.createdAt}
        </p>
        {/* Users List */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
            Users in Room:
          </h2>
          {room.users?.length > 0 ? (
            <ul className="list-disc list-inside">
              {room.users.map((user, index) => (
                <li key={index} className="text-lg">
                  {user}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg italic text-gray-400">
              No users in the room yet.
            </p>
          )}
        </div>
        <button onClick={game.startGame} className="bg-blue-500 m-2 p-2 text-white rounded-lg">
          Start Game
        </button>
      </div>

      {/* Message Toggle Button */}
      <button
        onClick={toggleMessageScreen}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Toggle message screen"
      >
        {showMessages ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Message Screen */}
      <div
        className={`fixed bottom-20 right-6 bg-gray-800 rounded-lg shadow-xl w-80 md:w-96 h-96 transition-all duration-300 flex flex-col ${
          showMessages
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg">Messages</h3>
          <button
            onClick={toggleMessageScreen}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-gray-400 italic text-center">No messages yet.</p>
          {messages.map((message) => (
            <div key={message.timestamp}>
              {message.sender}: {message.message}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex">
            <input
              value={typedMessage}
              type="text"
              onChange={(e) => {
                setTypedMessage(e.target.value);
              }}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white rounded-l-md px-4 py-2 focus:outline-none"
            />
            <button
              onClick={() => {
                setTypedMessage("");
                sendMessage(typedMessage);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
