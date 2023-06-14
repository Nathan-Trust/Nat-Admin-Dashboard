import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ThemeSettings from "../components/ThemeSettings";
import { MdFacebook, MdSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useStateContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { themeSettings, setThemeSettings, currentColor, user } =
    useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:flex-nowrap  w-full ">
      <div className="lg:w-96 px-4 py-12 sm:px-6 sm:py-16 bg-white dark:bg-secondary-dark-bg h-screen lg:px-8 lg:py-24 w-full">
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
              {error}
            </div>
          )}
        </div>

        <form
          action=""
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="dark:text-white">
              {" "}
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="password" className="dark:text-white">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-gray-200 dark:bg-test placeholder:dark:text-gray-100 dark:text-gray-200"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex gap-1">
              <input type="checkbox" id="remembrance" />
              <label htmlFor="remembrance" className="dark:text-white">
                Remember Me
              </label>
            </div>
            <Link className="text-blue-500">Reset Password</Link>
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
          className=" h-screen w-full bg-hero-pattern "
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
