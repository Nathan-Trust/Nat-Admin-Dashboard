import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import dayjs from "dayjs";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("true");
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#1A97F5");
  const [themeSettings, setThemeSettings] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [userUpdated, setUserUpdated] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [side, setSide] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [isClicked, setIsClicked] = useState(initialState);
  const [display, setDisplay] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [labels, setLabels] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [storageRef , setStorageRef ] = useState("")
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

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

  console.log(screenSize);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserUpdated(true);
        localStorage.setItem("isUserSignedIn", true);
        localStorage.setItem("chatSignedIn", true);
        console.log(currentUser);
        console.log(user);
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

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvents(null)
    }
  }, [showEventModal])

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  function updateLabels(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

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
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        display,
        setDisplay,
        showScrollbar,
        setShowScrollbar,
        tasks,
        setTasks,
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvents,
        setSelectedEvents,
        labels,
        setLabels,
        updateLabels,
        filteredEvents,displayName, setDisplayName,storageRef , setStorageRef 
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

/* const [user ,loading] = useAuthState(auth); */
