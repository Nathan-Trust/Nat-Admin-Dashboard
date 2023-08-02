import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import error from "../pages/5203299.jpg";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";
const NotFound = () => {
  /* const [user , loading] = useAuthState(auth) */
  const { user } = useStateContext();
  return (
    <div className="flex  flex-col justify-center items-center">
      <img src={error} style={{ width: "80vh", height: "80vh" }} alt="Oops something went wrong !!"/>
      <button
        type="button"
        style={{ borderRadius: "5px" }}
        className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white bg-blue-600"
      >
        {user ? (
          <Link to="/dashboard">Back to Home</Link>
        ) : (
          <Link to="/">Back to Home</Link>
        )}
      </button>
    </div>
  );
};

export default NotFound;

/* const [user , loading] = useAuthState(auth) */
/* let user = false */
