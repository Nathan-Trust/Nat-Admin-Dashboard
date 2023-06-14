import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("true");
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#1A97F5");
  const [themeSettings, setThemeSettings] = useState(false);
  /* const [user ,loading] = useAuthState(auth); */
  const [userUpdated, setUserUpdated] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
    console.log(currentColor);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserUpdated(true);
        localStorage.setItem("isUserSignedIn", true);
      } else {
        setUserUpdated(false);
        localStorage.removeItem("isUserSignedIn"); 
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, currentUser]);

  return (
    <StateContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        setCurrentColor,
        setMode,
        activeMenu,
        setActiveMenu,
        themeSettings,
        setThemeSettings,
        setColor,
        currentColor,
        signUp,
        logIn,
        currentUser
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
