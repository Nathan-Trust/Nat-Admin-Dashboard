import React from "react";
import { themeColors } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { MdOutlineCancel } from "react-icons/md";
import {BsCheck}  from  "react-icons/bs"

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, setThemeSettings , currentColor } =
    useStateContext();

  return (
    <div
      className="bg-test w-screen fixed nav-item top-0 right-0"
      style={{ zIndex: 2000 }}
    >
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-300">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              className="cursor-pointer"
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <div
                className="relative mt-2 cursor-pointer flex gap-5 items-center"
                key={item.name}
              >
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
/* import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { themeColors } from "../data/dummy";

const ThemeSettings = () => {
  const { currentMode, setCurrentMode, setThemeSettings  , setMode , setColor} = useStateContext();
  return (
    <div className="bg-test w-screen fixed top-0 right-0 h-screen">
      <div className="float-right w-400 bg-white h-screen">
        <div className="flex justify-between ">
          <h2>Theme Settings</h2>
          <div onClick={() => setThemeSettings(false)}>cancel</div>
        </div>
        <div>
          <div>
            <h3>Theme Option</h3>
          </div>
          <div>
            <input type="radio" name="theme" id="light" value="Light" onChange={setMode} checked={currentMode === 'Light'}/>
            <label htmlFor="Light">Light</label>
          </div>
          <div>
            <input type="radio" name="theme" id="dark" value="Dark" onChange={setMode} checked={currentMode === 'Dark'}/>
            <label htmlFor="Dark">Dark</label>
          </div>
        </div>

        <div>
          <div>Theme Color</div>
          <div className="flex gap-3">
            {themeColors.map((item ,index) => 
            ( <div
             className="relative mt-2 cursor-pointer flex gap-5 items-center"
             key={item.name}
           >
             <button
               type="button"
               className="h-10 w-10 rounded-full cursor-pointer"
               style={{ backgroundColor: item.color }}
               onClick={() => setColor(item.color)}
             >
             </button>
           </div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSetting */

/* import React , {useState} from "react";
import { useStateContext } from "../contexts/ContextProvider";
const ThemeSettings = () => {
  const { currentMode, setCurrentMode, setMode } = useStateContext();
    const [darkToggle, setDarkToggle] = useState(false)
  
  return (
    <div
      class={`h-screen w-full flex items-center justify-center bg-gray-300 flex-col ${
        darkToggle && 'dark'
      }`}
    >
      <label class="toggleDarkBtn">
        <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
        <span class="slideBtnTg round"></span>
      </label>
      <div class="max-w-sm rounded overflow-hidden bg-gray-100 p-5 rounded-lg mt-4 text-white dark:bg-gray-900">
        <img
          class="w-full"
          src="https://v1.tailwindcss.com/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="text-gray-800 dark:bg-nat font-bold text-xl mb-2">
            The Coldest Sunset
          </div>
          <p class="text-gray-800 dark:text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </div>
  )
}


export default ThemeSettings;
 */
