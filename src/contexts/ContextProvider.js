import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const StateContext = createContext();



const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("true");
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#1A97F5");
  const [themeSettings, setThemeSettings] = useState(false);
  const [addCustomer , setAddCustomer] = useState(false);
  const [userUpdated, setUserUpdated] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [side, setSide] = useState(true)
  const [screenSize, setScreenSize] = useState(undefined);
  const [isClicked, setIsClicked] = useState(initialState);

  console.log(screenSize)

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

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {  
    return signInWithEmailAndPassword(auth, email, password);
  };


  console.log(screenSize)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserUpdated(true);
        localStorage.setItem("isUserSignedIn", true);
        localStorage.setItem("chatSignedIn", true);
        console.log(currentUser)
        console.log(user)
      } else {
        setUserUpdated(false);
        localStorage.removeItem("isUserSignedIn");
        localStorage.removeItem("chatSignedIn");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

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
        currentUser,
        addCustomer,
        setAddCustomer,
        side,
        setSide,
        screenSize,
        setScreenSize,
        handleClick, isClicked, initialState, setIsClicked,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);




/* const [user ,loading] = useAuthState(auth); */