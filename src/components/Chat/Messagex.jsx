import React, { useEffect, useRef , useContext} from "react";
import img from "../../pages/5203299.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const sender = " bg-test dark:text-white dark:bg-blue-600 p-2 "
  const owner = "bg-blue-700 text-white dark:bg-nat p-2 "
  return (
    <div
      className={`flex gap-1 mb-2  sender ${message.senderId === currentUser.uid && "owner"}
      `}
    >
      <div className="flex flex-col items-end ">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="a guy"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          className="mb-5"
        />
        {/* <span className="text-sm">just now</span> */}
      </div>
      <div
        className="flex flex-col gap-2.5"
        style={{ maxWidth: "80%", alignItems: "flex-end" }}
      >
        <p
          className={message.senderId === currentUser.uid ? sender : owner}
          style={{ maxWidth: "max-content" }}
        >
          {message.text}
        </p>
         {message.img && 
          <img
          src={message.img}
          alt="a guy"
          style={{ width: "500px", height: "500px" }}
        />}
      </div>
    </div>
  );
};

export default Message;
