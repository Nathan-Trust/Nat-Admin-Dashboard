import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ThemeSettings from "../components/ThemeSettings";
import { MdFacebook, MdSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [visible, setVisible] = useState("password");
  // const [password , setPassword] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { themeSettings, setThemeSettings, currentColor } = useStateContext();

  const handleTogglePassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:flex-nowrap h-screen w-full dark:bg-secondary-dark-bg  items-center ">
      <div className=" lg:w-96 px-[60px] py-12 sm:px-3 sm:py-16 bg-white dark:bg-secondary-dark-bg   lg:px-8 lg:py-24 w-full">
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
          <h1 className="text-3xl sm:text-3xl dark:text-white">Log In</h1>

          <div className="mt-4 text-gray-500 flex justify-center items-center gap-5">
            <button
              type="button"
              className="bg-gray-200 dark:bg-test flex justify-between items-center gap-3 me-auto rounded-lg px-7 py-3 text-sm font-medium dark:text-white"
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
            <div className="text-red-400" style={{ fontSize: "12px" }}>
              <span>{error}</span>
            </div>
          )}
        </div>
        {loading && (
          <div className="dark:text-white">Checking database... </div>
        )}

        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="dark:text-white font-semibold">
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="dark:text-white font-semibold">
              Password
            </label>

            <div className="flex items-center justify-between w-full rounded-lg border-gray-200  text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" rounded-lg border-gray-200 p-4 w-full text-sm shadow-sm bg-transparent  placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter password"
              />

              <span className="ml-2 text-xl flex items-center">
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="flex items-center mr-2"
                >
                  {passwordVisible ? <EyeInvisibleFilled /> :  <EyeFilled />}
                </button>
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex gap-1">
              <input type="checkbox" id="remembrance" />
              <label htmlFor="remembrance" className="dark:text-white md:text-md text-[15px]">
                Remember Me
              </label>
            </div>
            <Link className="text-blue-500 md:text-md text-[15px]">Reset Password</Link>
          </div>

          <div className=" flex flex-col items-center justify-between gap-5">
            <button
              type="submit"
              className="inline-block rounded-lg  px-5 py-3 text-sm font-medium text-white w-full"
              style={{ background: currentColor }}
            >
              Sign in
            </button>

            <p className="text-sm text-gray-500 dark:text-white ">
              Don't have an account yet ?
              <Link className=" text-blue-600 ml-2" to="/signUp">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center w-full dark:bg-nat bg-light-mode">
        <div
          className=" h-screen w-1/2 bg-hero-pattern hidden lg:block "
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

export default Login;
