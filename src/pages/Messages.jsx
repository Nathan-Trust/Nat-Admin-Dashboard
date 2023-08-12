import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import HomeChat from "../components/HomeChat";
import { MdSettings } from "react-icons/md";
import { UserData } from "../data/UserTableData";
import { useInView } from "react-intersection-observer";

const Message = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor } =
    useStateContext();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: currentColor,
        borderRadius: 3,
        barThickness: 20,
        barPercentage: 0.8, // Adjust the width of the bars (default is 0.9)
        categoryPercentage: 0.7, // Adjust the spacing between bars (default is 0.8)
      },
    ],
  });

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger animation once
    threshold: 0.2, // The percentage of the element that needs to be in view to trigger the animation
  });

  /* useEffect(() => {
    Aos.init();
  }, []);

 */

  return (
    <>
      <div className="flex relative  bg-light-mode dark:bg-secondary-dark-bg ">
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

        <div className="dark:bg-nat" style={{ height: "100vh", zIndex:100 }}>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-0 hidden  mt-7 h-680 dark:bg-secondary-dark-bg rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>

        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full dark:bg-nat bg-slate-gray "
              : " w-full min-h-screen flex-2 dark:bg-nat bg-slate-gray "
          }
          // style={{ height: "100vh", overflowY: "auto" }}
        >
          <div>
            {themeSettings && <ThemeSettings />}
            <Navbar/>
            <HomeChat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;

/* import React from "react";
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
        </div>
      </div>
    </>
  );
};

export default Message;
 */
