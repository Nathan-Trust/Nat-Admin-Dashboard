import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import error from "../pages/5203299.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
const NotFound = () => {
  /* const [user , loading] = useAuthState(auth) */
  const {user} = useStateContext()
  return (
    <div className="flex  flex-col justify-center items-center">
        <img src={error} style={{width:"80vh", height:"80vh", }}/>
        <button
              type="button"
              style={{ borderRadius: "5px" }}
              className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white bg-blue-600"
            >
              {user ? <Link  to="/dashboard">Back to Home</Link>: <Link  to="/">Back to Home</Link>}
            </button>
        {/*        <div className=" bg-white  p-3 py-24 px-36 rounded-lg">
          <div
            className="justify-center flex  flex-col items-center "
          >
            <div>
              <h4 className="text-3xl">Not Found</h4>
            </div>
            <FaSadTear className="text-9xl" />
          </div>

          <div className="dark:text-white mt-9 text-center">
            <p>Page not found</p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              style={{ borderRadius: "5px" }}
              className="text-sm py-2 px-4 mt-8 hover:drop-shadow-xl text-white bg-blue-600"
            >
              <Link to={user ? "/dashboard" : "/"}>Go to Home</Link>
            </button>
          </div>
        </div> */}
    </div>
  );
};

export default NotFound;


/* const [user , loading] = useAuthState(auth) */
  /* let user = false */