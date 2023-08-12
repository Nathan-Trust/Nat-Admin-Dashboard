import React from "react";
import Sidebar from "./Chat/Sidebar";
import Chat from "./Chat/Chat";
import { useStateContext } from "../contexts/ContextProvider";


const HomeChat = () => {
  const {display} = useStateContext()
  return (
    <div className={display ? " " : " flex justify-center items-center w-full"}>
      <div
        className={
          display
            ? "flex h-[580px] w-full bg-light-mode dark:text-gray-200 dark:bg-nat px-4 py-4 gap-4"
            : "flex h-[580px] w-[400px] lg:w-2/6   bg-light-mode dark:text-gray-200 dark:bg-nat px-4 py-4 gap-4"
        }
        id="style-14"
      >
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}; 

export default HomeChat;
