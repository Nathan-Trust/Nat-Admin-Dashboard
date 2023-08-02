import React, { useEffect, useState } from "react";
import Message from "./Messagex";
import { useStateContext } from "../../contexts/ContextProvider";
import { onSnapshot , doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)
 
  return (
    <div style={{ height: "470px", overflowY:"scroll" }} id="style-14">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
