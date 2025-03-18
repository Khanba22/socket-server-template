import React from "react";

interface GameUIProps {
  openSettings: boolean;
  setOpenSettings: (openSettings: boolean) => void;
}

const GameUI = ({ setOpenSettings, openSettings }: GameUIProps) => {
  const handleSettings = () => {
    console.log(openSettings);
    setOpenSettings(!openSettings);
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0">
      <button className="cursor-pointer" onClick={handleSettings}>Settings</button>
    </div>
  );
};

export default GameUI;
