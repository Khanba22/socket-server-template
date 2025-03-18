"use client";
import GameUI from "@/components/three/GameUI";
import MainCanvas from "@/components/three/MainCanvas";
import SettingsTab from "@/components/three/SettingsTab";
import React, { useState } from "react";

const Page = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div>
      <MainCanvas />
      <GameUI setOpenSettings={setOpenSettings} openSettings={openSettings} />
      {openSettings && (
        <SettingsTab
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      )}
    </div>
  );
};

export default Page;
