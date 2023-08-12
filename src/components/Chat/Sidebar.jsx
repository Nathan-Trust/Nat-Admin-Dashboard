import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Chat from "./Chat";
import SideChat from "./SideChat";
import { useStateContext } from "../../contexts/ContextProvider";

const Sidebar = () => {
  const {display , showScrollbar , setShowScrollbar} = useStateContext()
  return (
      <div
      className={
        display
          ? "sidebar relative dark:bg-secondary-dark-bg bg-white rounded-2xl w-full lg:w-2/6 overflow-hidden hidden lg:block"
          : "sidebar relative dark:bg-secondary-dark-bg bg-white rounded-2xl w-full overflow-hidden block"
      }

    >
      <Navbar />
      <SearchBar />
      <SideChat />
    </div>
  );
};

export default Sidebar;
