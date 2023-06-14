import React from "react";
import { dashCard } from "../data/dummy";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import { MdSettings } from "react-icons/md";
import Dropdown from "../components/Dropdown";

const Dashboard = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor } =
    useStateContext();
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
            <div className="w-72 fixed sidebar dark:bg-nat bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-15 ml-5 mt-7 h-680 dark:bg-nat rounded-lg bg-white">
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
          <div>
            {themeSettings && <ThemeSettings />}
            <div className="m-7 ">
              <Header title="Dashboard" dropdown={<Dropdown/>} />
              <div className="flex  flex-wrap  gap-4 items-center">
                {dashCard.map((card) => (
                  <div className=" flex items-center gap-3 bg-white h-32 dark:text-gray-200 dark:bg-nat md:w-270 p-4 pt-9 rounded-2xl">
                    <button
                      type="button"
                      style={{
                        color: card.iconColor,
                        backgroundColor: card.iconBg,
                      }}
                      className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                    >
                      {card.icon}
                    </button>
                    <div>
                      <h3>{card.amount}</h3>
                      <p>{card.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
