 
import React, {useState,useEffect,useContext,useReducer} from 'react'
import {auth } from './firebase.js'
import {onAuthStateChanged} from 'firebase/auth'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
	const [windowWidth,setWindowWidth]= useState(window.innerWidth)
	const [currentUser,setCurrentUser] = useState({})
 
	useEffect(()=>{
		const unsub=onAuthStateChanged(auth,(user)=>{
			setCurrentUser(user)
		})
			return ()=> unsub()
	},[])

     //  useEffect(()=>{
     //    const resize=()=>{
		 //      setWindowWidth(window.innerWidth)
		 //     }
     //    window.addEventListener('resize', resize)
     //     return ()=> window.removeEventListener('resize',resize)
     // },[currentUser])

 	return <AppContext.Provider value={{windowWidth,currentUser}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 