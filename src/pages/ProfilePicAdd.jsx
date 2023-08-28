import React, { useState, useContext  , useEffect} from "react";
import ThemeSettings from "../components/ThemeSettings";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { MdSettings, MdLinkedCamera } from "react-icons/md";
import { FaGrinWink } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import { db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { MdImage } from "react-icons/md";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
// import ThemeSettings from "../components/ThemeSettings";
// import { useStateContext } from "../contexts/ContextProvider";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
//import login from "../Login (2).png";
// import { MdFacebook, MdSettings } from "react-icons/md";
// import { FcGoogle } from "react-icons/fc";
// import { auth } from "../utils/firebase";
// import { GoogleAuthProvider, updateProfile } from "firebase/auth";/*
// import { signInWithPopup } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import { db } from "../utils/firebase";
// import { doc, setDoc } from "firebase/firestore"; */

export default function ProfilePicAdd() {
  const {
    themeSettings,
    setThemeSettings,
    currentColor,
    displayName,
    storageRef,
  } = useStateContext();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  // const [showfile, setShowFile] = useState(true);
  const [showAddImage, setShowAddImage] = useState(false);
  const navigate = useNavigate();
  // const [showLightEffect, setShowLightEffect] = useState(false); // State to control light effect
  const [animateImage, setAnimateImage] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
const [imageDataUrl ,setImageDataUrl] = useState(null)
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  useEffect(() => {
    if (file !== null) {
      setShowAddImage(true);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(selectedFile); // Set the selected File object
        setImageDataUrl(event.target.result); // Set the data URL for display
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleSkip = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const file = e.target[0].files[0];
    // file = "";
    try {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile of user for only authentication
            await updateProfile(currentUser, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore(users collection)
            //"users"stands for collection name

            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              displayName,
              email: currentUser.email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", currentUser.uid), {});
            navigate("/dashboard");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
      setErr(err);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    // setShowLightEffect(true); // Trigger the light effect
    // setAnimateImage(true); // Trigger the image animation
    setContentVisible(false); // Hide the content
    e.preventDefault();
    // const file = e.target[0].files[0];
    try {
      //Create user

      //Create a unique image name
      /* const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`); */

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile of user for only authentication
            await updateProfile(currentUser, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore(users collection)
            //"users"stands for collection name

            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              displayName,
              email: currentUser.email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", currentUser.uid), {});
            // setTimeout(() => {
              navigate("/dashboard");
            // }, 1000);
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
      setErr(err);
    }
  };

  /* black: {
      100: "#d2d1d6",
      200: "#a5a4ad",
      300: "#797684",
      400: "#4c495b",
      500: "#1f1b32",
      600: "#191628",
      700: "#13101e",
      800: "#0c0b14",
      900: "#06050a"
}, */

  /*  black: {
      100: "#d4d3d9",
      200: "#aaa7b3",
      300: "#7f7c8e",
      400: "#555068",
      500: "#2a2442",
      600: "#221d35",
      700: "#191628",
      800: "#110e1a",
      900: "#08070d"
}, */

  return (
    <div
      className="flex items-center justify-center dark:bg-[#191628] bg-gray-400 h-screen"
      style={{ margin: "0px", padding: "0px" }}
    >
      {themeSettings && <ThemeSettings />}

      {contentVisible && (
        <div className=" dark:bg-[#2a2442] bg-white dark:text-[#d4d3d9] p-4 rounded-md">
          <div className="flex justify-end">
            <p className="text-gray-500 cursor-pointer" onClick={handleSkip}>
              Skip
            </p>
          </div>
          <div className={`flex justify-center`}>
            <img
              src={imageDataUrl}
              alt="avatar"
              className="rounded-full w-[100px] h-[100px]"
            />
          </div>
          <h3 className="text-center mt-4 text-xl">
            {`Welcome ${displayName}`}{" "}
          </h3>
          <div className="w-[350px]">
            <p>Were happy to have you join the cravens</p>
            <p>
              But for we all to know your identity we'll love you to add an
              avatar to proceed{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="file"
              className=" cursor-pointer flex items-center gap-2 dark:text-white mt-2"
            >
              <MdImage className="text-2xl" /> <span>Add an avatar</span>
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className="flex justify-end">
              {showAddImage && <button type="submit">Add Image </button>}
            </div>
          </form>
          {loading && (
            <div className="dark:text-white">
              Uploading and compressing the image please wait...{" "}
            </div>
          )}
        </div>
      )}

      {animateImage && (
        <div className={`flex justify-center scaled-and-spun`}>
          {console.log(file)} {/* Add this line */}
          <img
            src={imageDataUrl}
            alt="avatar"
            className="rounded-full w-[100px] h-[100px]"
          />
        </div>
      )}
      
      {/* {showLightEffect && <div className="sharp-light-effect" />} */}
      <div className="fixed right-4 bottom-4">
        <button
          type="button"
          style={{ backgroundColor: currentColor, borderRadius: "50%" }}
          className="text-2xl p-3 hover:drop-shadow-xl text-white"
          onClick={() => setThemeSettings(true)}
        >
          <MdSettings />
        </button>
      </div>
    </div>
  );
}
