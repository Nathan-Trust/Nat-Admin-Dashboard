import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
//import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Invoice from "./pages/Invoice";
import Schedule from "./pages/Schedule";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Notification from "./pages/Notifications";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./components/Home";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
function App() {
  
  const [user , loading] = useAuthState(auth)
  const { currentMode, setCurrentColor, setCurrentMode} = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor , setCurrentMode]);

  useEffect(()=> {
    if(user){
      <Navigate to='/dashboard'/>
    }
  },[])
  return (
      <CssBaseline>
      <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    </CssBaseline>
  );
}

export default App;
