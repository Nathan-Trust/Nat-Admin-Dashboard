import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import HomeChat from "../components/HomeChat";
import {MdSettings} from "react-icons/md"
import ThemeSettings from "../components/ThemeSettings";
const Message = () => {
  const { activeMenu , currentColor , themeSettings , setThemeSettings} = useStateContext();

  return (
    <>
      <div className="flex relative bg-light-mode dark:bg-secondary-dark-bg ">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            style={{ backgroundColor: currentColor, borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl text-white"
            onClick={() => setThemeSettings(true)}
          >
            <MdSettings />
          </button>
        </div>

        <div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg  bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-15 ml-5 mt-7 h-680 dark:bg-secondary-dark-bg  rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>

        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full "
              : " w-full min-h-screen flex-2 "
          }
        >
          {themeSettings && <ThemeSettings />}
          <HomeChat />
        </div>
      </div>
    </>
  );
};

export default Message;
