import React, { useState , useContext} from "react";
import img from "../../pages/5203299.jpg";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useStateContext } from "../../contexts/ContextProvider";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

const SearchBar = () => {
  const { currentUser } = useContext(AuthContext)
  const [username, setUsername] = useState();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  }
  const handleKey =  (e) => {
    e.key === "Enter" && handleSearch();
  }
  const handleSelect = async () => {
     //check whether the group(chats in firestore) exists, if not create
     const combinedId =
     currentUser.uid > user.uid
       ? currentUser.uid + user.uid
       : user.uid + currentUser.uid;
   try {
     const res = await getDoc(doc(db, "chats", combinedId));

     if (!res.exists()) {
       //create a chat in chats collection
       await setDoc(doc(db, "chats", combinedId), { messages: [] });

       //create user chats
       await updateDoc(doc(db, "userChats", currentUser.uid), {
         [combinedId + ".userInfo"]: {
           uid: user.uid,
           displayName: user.displayName,
           photoURL: user.photoURL,
         },
         [combinedId + ".date"]: serverTimestamp(),
       });

       await updateDoc(doc(db, "userChats", user.uid), {
         [combinedId + ".userInfo"]: {
           uid: currentUser.uid,
           displayName: currentUser.displayName,
           photoURL: currentUser.photoURL,
         },
         [combinedId + ".date"]: serverTimestamp(),
       });
     }
   } catch (err) {
     setError(true)
   }
setUser(null)
setUsername("")
  }
  return (
    <div>
      <div className="ml-4">
        <input
          type="text"
          className="dark:bg-nat bg-light-mode p-2  flex items-center justify-between rounded-md w-11/12 "
          placeholder="Find a user"
          value={username}
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {error && <span>User not found!</span>}
   {user && 
        <div
        className="flex items-center gap-3 cursor-pointer hover:bg-slate-600  p-2"
        onClick={handleSelect}
      >
        <img
          src={user.photoURL}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <span className="text-white">{user.displayName}</span>
        </div>
      </div>}
     
    </div>
  );
};

export default SearchBar;

/*     //check whether group exist or not(chats in firestore)  if it oesnt exist create a new one
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
 try{
  const res = await getDocs(doc(db, "chats", combinedId))
  if(!res.exists()){
    await setDoc(doc,(db, "chats" , combinedId) , {messages:[]})

    //create user chat
  await updateDoc(doc(db, "userChat" , user.uid) , {
    [combinedId + ".userInfo"]:{
      uid:user.uid,
      displayName:currentUser.displayName,
      photoURL:user.photoURL

        },
        [combinedId + "date"]: serverTimestamp()
  })
  }
    //create user chat */
