import React from "react";
import { links } from "../../data/dummy";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdLogout, MdMenu, MdOutlineCancel } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const SideBar = () => {
  const { activeMenu, setActiveMenu  , currentColor , setLog} = useStateContext();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
    
   /*  const [signUp, setSignUp] = useState(true)

    const setAccount = () => {
      setSignUp(!signUp)
    } */
   /*  if(!user){
      <Navigate to="/"/>
    } */
   
  const [user,loading] = useAuthState(auth)

   
  return (
    <div className={activeMenu ? "ml-3 h-screen overflow-y-auto md:hover:oveflow-auto pb-10" : " h-680"}>
      {activeMenu ? (
        <>
      <div className="flex flex-col justify-between">
       <div>
       <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              Craven
            </Link>

            <button
            type="button"
            onClick={() => setActiveMenu(!activeMenu)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
          </div>

          <div className="mt-10">
            {links.map((link) => (
              <div>
                <NavLink
                  to={`${link.link}`}
                  style={({ isActive }) => ({backgroundColor:isActive ? currentColor : ' '})}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </div>
            ))}
            
          </div>

          <div className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  dark:text-white  text-md m-2 mt-24">
            <MdLogout/>
            <Link  onClick={() => auth.signOut()}>Log out</Link>
          </div>
       </div>
       

        {/* <div className="items-center justify-self-end">
         {
          signUp? (
            <Link
              to="/signUp"
              onClick={() => {
                setAccount()
              }}
            >
              <p>Sign Up</p>
            </Link>
          ) : (
            <Link
              to='/logIn'
              onClick={() => {
                setAccount()
              }}
            >
              <p>Log In</p>
            </Link>
          )
         }
        </div> */}
      </div>

        </>
      ) : (
        <div className="flex flex-col items-center" >
        
            <button
            type="button"
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow hover:bg-light-gray"  onClick={() => {
              setActiveMenu(!activeMenu);
            }}>
              <MdMenu/>
            </button>

        
          <div className="mt-10">
            {links.map((link) => (
              <div>
                <NavLink
                  to={`${link.link}`}
                  style={({ isActive }) => ({
                    color: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ?  "flex items-center gap-5 p-2 pt-3 pb-2.5  text-white  text-2xl" : 
                    "flex items-center gap-5 px-2 mt-3 pt-3 pb-2.5 text-2xl dark:text-white max"
                  }
                >
                  {link.icon}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 pt-3 pb-2.5 rounded-lg  text-white  text-2xl  mt-12 max">
            <MdLogout onClick={() => auth.signOut()}/>
          </div>

        </div>
      )}
    </div>
  );
};

export default SideBar;
