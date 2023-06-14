import React from "react";
import ThemeSettings from "./ThemeSettings";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { MdSettings , MdLinkedCamera } from "react-icons/md";
import { FaGrinWink} from "react-icons/fa"

const Home = () => {
  const {
    themeSettings,
    setThemeSettings,
    currentColor
  } = useStateContext();
  return (
    <div>
      {themeSettings && <ThemeSettings/>}
    <div className="dark:bg-secondary-dark-bg bg-gray-400 w-full h-screen flex items-center justify-center ">
    <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
  <button type="button" style={{ backgroundColor:currentColor, borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl text-white" onClick={() => setThemeSettings(true)}><MdSettings/></button>
    </div>
    <div className="dark:bg-test bg-white  p-4 py-24 px-24 rounded-lg">
     <div className="justify-center flex dark:text-white text-9xl " style={{color:currentColor}}><FaGrinWink/></div>
    <div className="dark:text-white mt-9">
     <p>Your account successfully created.</p>
   </div>
   <div className="flex justify-center">
   <button type="button"style={{ backgroundColor:currentColor, borderRadius: '5px' }}
            className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white">
              <Link to='/dashboard'>Go to Home</Link>
            </button>
   </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
