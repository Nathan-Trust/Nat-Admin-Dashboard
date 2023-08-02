import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import ThemeSettings from "../components/ThemeSettings";
import { MdImage } from "react-icons/md";
//import login from "../Login (2).png";
import { MdFacebook, MdSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import { db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  // const [visible, setVisible] = useState("password");
  // const [signPassword, setSignPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  /* Google Authentication */
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async (e) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/home");
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const { themeSettings, setThemeSettings, currentColor } = useStateContext();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3]?.files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile of user for only authentication
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore(users collection)
            //"users"stands for collection name
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/home");
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

  const handleTogglePassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className="relative flex flex-wrap lg:flex-nowrap h-screen w-full dark:bg-secondary-dark-bg  items-center">
      <div className="  lg:w-96 px-[80px]  py-12 sm:px-6 sm:py-16 bg-white dark:bg-secondary-dark-bg  lg:px-8 lg:py-11 w-full">
        <div className="mx-auto max-w-lg text-center">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              style={{ backgroundColor: currentColor, borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl text-white"
              onClick={() => setThemeSettings(true)}
            >
              <MdSettings />
            </button>
          </div>
          <p className="lg:text-2xl sm:text-3xl dark:text-white">Sign Up</p>

          <div className="mt-4 text-gray-500 flex justify-center items-center gap-5">
            <button
              type="button"
              className="bg-gray-200 dark:bg-test flex justify-between items-center gap-3 me-auto rounded-lg px-7 py-3 text-sm font-medium dark:text-white"
              onClick={GoogleLogin}
            >
              <FcGoogle />
              Google
            </button>
            <button className="bg-gray-200 dark:bg-test  rounded-lg px-5 py-3 text-sm font-medium dark:text-white flex justify-between items-center gap-3 ">
              <MdFacebook />
              Facebook
            </button>
          </div>
          <div className="flex justify-center items-center mt-7">
            <div className="borderMe " />
            <p className="dark:text-white">Or</p>
            <div className="borderMe"></div>
          </div>
          {error && (
            <div className=" mt-2 text-red-400 text-sm">
              <p>{`Oops! something went wrong ${err}`} </p>
            </div>
          )}
        </div>

        <form
          className="mx-auto mb-0  max-w-md space-y-3"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="fullName"
              className="dark:text-white text-sm font-semibold"
            >
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                id="fullName"
                className="w-full rounded-md border-gray-200 px-3 py-3 pe-12 text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="dark:text-white text-sm font-semibold"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-md border-gray-200 px-3 py-3 pe-12 text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="dark:text-white text-sm font-semibold"
            >
              Password
            </label>

            <div className="flex items-center justify-between w-full rounded-lg border-gray-200  text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" rounded-lg px-3 py-3 pe-12 w-full border-gray-200 text-sm shadow-sm bg-transparent  placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter password"
              />

              <span className="ml-2 text-[18px] flex items-center">
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="flex items-center mr-4"
                >
                  {passwordVisible ? <EyeInvisibleFilled /> :  <EyeFilled />}
                </button>
              </span>
            </div>
            <input type="file" id="file" style={{ display: "none" }} />
            <label
              htmlFor="file"
              className=" cursor-pointer flex items-center gap-2 dark:text-white mt-2"
            >
              <MdImage className="text-2xl" /> <span>Add an avatar</span>
            </label>
            {loading && (
              <div className="dark:text-white">
                Uploading and compressing the image please wait...{" "}
              </div>
            )}
          </div>

          <div className="flex justify-between gap-1">
            <div className="mt-1">
              <input
                type="checkbox"
                id="remembrance"
                className="placeholder:dark:bg-transparent-100"
              />
            </div>
            <div
              id="remembrance"
              className="dark:text-white mt-1"
              style={{ fontSize: "15px" }}
            >
              By creating an account you agree to the
              <span className="text-blue-600"> terms of use</span> and our
              <span className="text-blue-600"> privacy policy</span>
            </div>
          </div>

          <div className=" flex flex-col items-center justify-between gap-5">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
              style={{ background: currentColor }}
            >
              Create account
            </button>

            <p className="text-sm text-gray-500 dark:text-white ">
              Already have an account
              <Link className=" text-blue-600 ml-2" to="/">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center w-full dark:bg-nat bg-light-mode">
        <div
          className=" h-screen w-1/2 bg-hero-pattern hidden lg:block"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      </div>

      {themeSettings && <ThemeSettings />}
    </section>
  );
};

export default SignUp;
