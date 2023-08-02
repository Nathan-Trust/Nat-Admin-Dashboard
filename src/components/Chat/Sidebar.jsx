import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Chat from "./Chat";
import SideChat from "./SideChat";

const Sidebar = () => {
  return (
    <div className="sidebar relative dark:bg-secondary-dark-bg bg-white rounded-2xl w-2/6 overflow-hidden">
      <Navbar />
      <SearchBar />
      <SideChat />
    </div>
  );
};

export default Sidebar;
