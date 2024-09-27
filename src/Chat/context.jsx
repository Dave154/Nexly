 import React, {useState ,useContext,useEffect,useReducer} from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import {useUniversal} from '.././context.jsx'
import {db} from '.././firebase.js'


 const ChatContext = React.createContext()
 const ChatProvider =({children}) =>{
  const {currentUser} =useUniversal()


 const initialState= {
    chatId:'null',
    user:{}
  }

  const chatReducer=(state,action)=>{
    switch (action.type){
    case 'CHANGE_USER':
      return {...state,
      user:action.payload,
    chatId: currentUser.uid > action.payload.uid ? 
    currentUser.uid + action.payload.uid 
    : action.payload.uid + currentUser.uid
  };

    default: return state
    }
  }

  const [state,dispatch]=useReducer(chatReducer,initialState)
  const [chats,setChats]=useState({})
  const [sideOpen,setSideOpen] = useState(false)
  const [subOpen,setSubOpen]=useState(false)
  const [chatForm,setChatForm]= useState([])
  const [isEmoji ,setIsEmoji] =useState(false)
  const [isNewChat,setisNewChat] =useState(false)
  const [isError,setIsError] = useState(false)
  const [isLoading, setIsLoading]= useState(true)
      const handleSide=()=>{
        setSideOpen(!sideOpen)
      }
      const closeSide =()=>{
      	setSideOpen(false)
      }

useEffect(()=>{
          const getChats =()=>{
              const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                console.log(doc.exists())
                if(!doc.data()){
                    setIsLoading(true)
                }else{
                  setIsLoading(false)

                }
                console.log(doc.data())
             doc.data() && setChats(doc.data()) 
            });

            return ()=>unsub()
    }
          currentUser.uid && getChats()
},[currentUser.uid])

useEffect(()=>{
    const close = (e)=>{
      if(sideOpen && e.x > 185){
        closeSide()
      }
    }
	 document.addEventListener('click', close)
  return ()=>{
      document.removeEventListener('click', close)
  }
},[sideOpen])

useEffect(()=>{
  const close =(e)=>{
      if(isNewChat && e.target.id=== 'NewChat'){
        setisNewChat(false)
      }
  }
   document.addEventListener('click', close)
   return ()=>  document.removeEventListener('click', close)
},[isNewChat])

  const handleSelect =(user)=>{
    dispatch({type:'CHANGE_USER',payload:user})
  }
 	return <ChatContext.Provider value={
 		{
      ...state,
    handleSelect,
 		sideOpen,
 		handleSide,
 		closeSide,
    subOpen,
    setSubOpen,
    isEmoji,
    setIsEmoji,
    isNewChat,
    setisNewChat,
    chats,
    isError,
    isLoading
     	}
 	}>
 		{children}
 	</ChatContext.Provider>
 }

 const useGlobe =()=>{
 	return useContext(ChatContext)
 }
 export {useGlobe , ChatProvider}