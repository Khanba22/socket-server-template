"use client";

import { createContext, useContext, useState } from "react";
interface IUser {
  username: string;
  setUsername: (username: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}
const UserContext = createContext<IUser>({
  username: "",
  setUsername:()=>{}
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>
  );
};

export const useUser = ()=>{
    if(!UserContext){
        throw new Error("User Context Wrapper Not Available")
    }
    return useContext(UserContext);
}