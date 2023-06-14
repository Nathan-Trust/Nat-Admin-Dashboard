import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import { MdSettings } from "react-icons/md";

const Calendar = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor
  } = useStateContext();
  return (
    <>
    <div className="flex relative  bg-light-mode dark:bg-secondary-dark-bg ">
  <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
  <button type="button" style={{ backgroundColor:currentColor, borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl text-white" onClick={() => setThemeSettings(true)}><MdSettings/></button>
    </div>

    <div>
    {activeMenu ? (
      <div className="w-72 fixed sidebar dark:bg-test bg-white ">
        <SideBar/>
      </div>
    ) : (
      <div className=" w-15 ml-5 mt-7 h-680 dark:bg-test rounded-lg bg-white">
        <SideBar />
      </div>
    )}
  
    </div>

  <div
    className={
      activeMenu
        ? ' min-h-screen md:ml-72 w-full '
        : ' w-full min-h-screen flex-2 '
    }
  >
   <div>
   {themeSettings && <ThemeSettings/>}
  <h1>Calendar</h1>
   </div>
             </div>
             
</div>
    
    </>
  );
};

export default Calendar;
