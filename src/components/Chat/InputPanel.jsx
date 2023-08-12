
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db , storage } from "../../utils/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { SendOutlined } from "@ant-design/icons";

const InputPanel = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
 const {currentUser} = useContext(AuthContext)
 const {data} = useContext(ChatContext)

 const handleSend = async () => {
  if (img) {
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      }
    );
  } else {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  }

  await updateDoc(doc(db, "userChats", currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  setText("");
  setImg(null);
  };
  
  const handleKey =  (e) => {
    e.code === "Enter" && handleSend();
  }

  return (
    <div
      style={{ height: "50px" }}
      className="dark:bg-nat bg-light-mode p-2 flex items-center justify-between rounded-md w-11/12 
      "
      onKeyDown={handleKey}
    >
      <input
        type="text"
        className="border-none outline-none text-md placeholder:text-slate-500 w-4/5 bg-transparent"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex items-center gap-2">
        <div>
          <input
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="file" className="cursor-pointer">
            <FaImage />
          </label>
        </div>

        <div className="mb-2">
          <button
            type="button"
            onClick={handleSend}
            className="dark:text-white text-xl"
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
