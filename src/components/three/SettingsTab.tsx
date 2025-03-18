import React from "react";

interface SettingTabProps {
  openSettings: boolean;
  setOpenSettings: (openSettings: boolean) => void;
}

const SettingsTab = ({ setOpenSettings, openSettings }: SettingTabProps) => {
  const handleSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <div className="h-screen w-screen fixed bg-black z-10 top-0 left-0 bg-opacity-50">
      Nothing here yet
      <button onClick={handleSettings}>Close</button>
    </div>
  );
};

export default SettingsTab;
