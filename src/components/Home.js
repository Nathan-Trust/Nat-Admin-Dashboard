import React from "react";
import ThemeSettings from "./ThemeSettings";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { MdSettings, MdLinkedCamera } from "react-icons/md";
import { FaGrinWink } from "react-icons/fa";

const Home = () => {
  const { themeSettings, setThemeSettings, currentColor } = useStateContext();
  return (
    <div
      className="flex items-center justify-center dark:bg-secondary-dark-bg bg-gray-400 h-screen"
      style={{ margin: "0px", padding: "0px" }}
    >
      {themeSettings && <ThemeSettings />}

      <div className="dark:bg-test bg-white p-4 py-8 rounded-lg md:px-16">
        <div
          className="justify-center flex dark:text-white text-6xl lg:text-9xl "
          style={{ color: currentColor }}
        >
          <FaGrinWink />
        </div>
        <div className="dark:text-white mt-9">
          <p>Your account successfully created.</p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            style={{ backgroundColor: currentColor, borderRadius: "5px" }}
            className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white"
          >
            <Link to="/dashboard">Go to Home</Link>
          </button>
        </div>
      </div>
      <div
        className="fixed right-4 bottom-4">
        <button
          type="button"
          style={{ backgroundColor: currentColor, borderRadius: "50%" }}
          className="text-2xl p-3 hover:drop-shadow-xl text-white"
          onClick={() => setThemeSettings(true)}
        >
          <MdSettings />
        </button>
      </div>
    </div>
  );
};

export default Home;

/*  <div
   className="w-full h-screen flex items-center justify-center  "
   // style={{ border: "12px solid yellow" }}
 >
   <div
     className="dark:bg-secondary-dark-bg bg-gray-400  "
     style={{ border: "1px solid red" }}
   >
     <div
       className="fixed right-4 bottom-4"
       style={{ zIndex: "1000", border: "1px solid green" }}
     >
       <button
         type="button"
         style={{ backgroundColor: currentColor, borderRadius: "50%" }}
         className="text-2xl p-3 hover:drop-shadow-xl text-white"
         onClick={() => setThemeSettings(true)}
       >
         <MdSettings />
       </button>
     </div>
     <div className="dark:bg-test bg-white  p-4 py-2 rounded-lg ">
       <div
         className="justify-center flex dark:text-white text-4xl lg:text-9xl"
         style={{ color: currentColor }}
       >
         <FaGrinWink />
       </div>
       <div className="dark:text-white mt-9">
         <p>Your account successfully created.</p>
       </div>
       <div className="flex justify-center">
         <button
           type="button"
           style={{ backgroundColor: currentColor, borderRadius: "5px" }}
           className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white"
         >
           <Link to="/dashboard">Go to Home</Link>
         </button>
       </div>
     </div>
   </div>
 </div>; */
