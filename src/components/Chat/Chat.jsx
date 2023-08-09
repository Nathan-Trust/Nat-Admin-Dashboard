import { CameraOutlined, MoreOutlined } from "@ant-design/icons";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import Messages from "./Messages";
import InputPanel from "./InputPanel";
import { useStateContext } from "../../contexts/ContextProvider";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat  rounded-2xl overflow-hidden w-3/5 dark:bg-secondary-dark-bg bg-white">
      <div className="flex items-center justify-between  p-3">
       <div className="flex items-center gap-2">
       <img src={data.user?.photoURL} alt=""  style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}/>
        <span>{data.user?.displayName}</span>
       </div>
        <div className="flex gap-2 text-xl">
          <CameraOutlined />
          <FaUserFriends />
          <MoreOutlined />
        </div>
      </div>
      <Messages />
      <div className="flex justify-center w-full">
      <InputPanel  />
      </div>
    </div>
  );
};

export default Chat;
