import React from "react";
import Sidebar from "./Chat/Sidebar";
import Chat from "./Chat/Chat";

const HomeChat = () => {
  return (
    <div>
      <div className="flex h-screen w-full bg-light-mode dark:text-gray-200 dark:bg-nat px-4 py-4 gap-4" id="style-14">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}; 

export default HomeChat;
