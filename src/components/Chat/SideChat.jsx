import React, { useEffect } from "react";
import img from "../../pages/5203299.jpg";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useStateContext } from "../../contexts/ContextProvider";

const SideChat = () => {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const {display , setDisplay} = useStateContext()

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);
  
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setDisplay(true)
  };

  return (
    <div className="mt-3">
        
        {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="flex items-center gap-3 cursor-pointer  dark:hover:bg-slate-600 p-2 hover:bg-slate-100  dark:text-white "
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt=""  style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }} />
          <div className="dark:text-white">
            <span className="font-semibold">{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideChat;


