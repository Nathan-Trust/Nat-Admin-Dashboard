import React from "react";
import img from "../../pages/5203299.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex  items-center justify-between p-4">
      <span className=" font-semibold dark:text-white md:hidden lg:block">Messages</span>
      <div className="flex gap-3">
        <div className="flex">
          <img
            src={currentUser.photoURL}
            alt=""
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{currentUser.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
