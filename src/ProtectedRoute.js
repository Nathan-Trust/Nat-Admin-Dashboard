import React , {useState , useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'  
import { auth } from './utils/firebase'
import { useStateContext } from './contexts/ContextProvider'
import Home from './components/Home'


const ProtectedRoute = ({children}) => {
  /* const [user,loading] = useAuthState(auth) */
  const {  currentUser} = useStateContext();
  if(localStorage.getItem("isUserSignedIn")) {
 return (
  <>
  {children}
  </>
 )
  } else{
    return ( <Navigate to="/" />)
  }
  
}
export default ProtectedRoute;

/*  const {user} = useStateContext()
  if(!user){
    return <Navigate to="/"/>
  } */