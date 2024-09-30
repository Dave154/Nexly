 
import React, {useState,useEffect,useContext,useReducer} from 'react'
import {auth } from './firebase.js'
import {onAuthStateChanged} from 'firebase/auth'

const AppContext = React.createContext()

 const AppProvider =({children})=>{
	const [windowWidth,setWindowWidth]= useState()
	const [windowHeight,setWindowHeight]= useState()
	const [currentUser,setCurrentUser] = useState({})
 
	useEffect(()=>{
		const unsub=onAuthStateChanged(auth,(user)=>{
			setCurrentUser(user)
		})
			return ()=> unsub()
	},[])
	 const resize=()=>{
		      setWindowWidth(window.innerWidth)
		       setWindowHeight(window.innerHeight)
		     }

      
      useEffect(()=>{
      	resize()
        window.addEventListener('resize', resize)
         return ()=> window.removeEventListener('resize',resize)
     },[windowWidth])

 	return <AppContext.Provider value={{windowWidth,windowHeight,currentUser}}>
 		{children}
 	</AppContext.Provider>
 }

 const useUniversal=()=>{
 	return useContext(AppContext)
 }

 export {AppProvider,useUniversal} 