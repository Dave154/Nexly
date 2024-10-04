 import React, { useState, useContext, useEffect, useReducer } from 'react'
 import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
 import { onMessage} from "firebase/messaging";
 import { useUniversal } from '.././context.jsx'
 import { db} from '.././firebase.js'
 // import {collection,query,where,getDocs,getDoc,setDoc,doc, } from 'firebase/firestore'

 const ChatContext = React.createContext()
 const ChatProvider = ({ children }) => {
     const { currentUser } = useUniversal()


     const initialState = {
         chatId: 'null',
         user: {}
     }

     const chatReducer = (state, action) => {
         switch (action.type) {
             case 'CHANGE_USER':
                 return { ...state,
                     user: action.payload,
                     chatId: currentUser.uid > action.payload.uid ?
                         currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                 };

             default:
                 return state
         }
     }

     const [state, dispatch] = useReducer(chatReducer, initialState)
     const [chats, setChats] = useState({})
     const [requests, setRequests] = useState({})
     const [requestsActivity, setRequestsActivity] = useState(null)
     const [sideOpen, setSideOpen] = useState(false)
     const [subOpen, setSubOpen] = useState(false)
     const [chatForm, setChatForm] = useState([])
     const [isEmoji, setIsEmoji] = useState(false)
     const [isNewChat, setisNewChat] = useState(false)
     const [isError, setIsError] = useState(false)
     const [isLoading, setIsLoading] = useState(true)
     const handleSide = () => {
         setSideOpen(!sideOpen)
     }
     const closeSide = () => {
         setSideOpen(false)
     }

     const handleActivity = (number) => {
         if (number >= 100) {
             return '99+'
         } else if (number <= 0) {
             return null
         } else {
             return number
         }
     }
     useEffect(() => {
         const getInfo = () => {
             const unsubChats = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                 if (!doc.data()) {
                     setIsLoading(true)
                 } else {
                     setIsLoading(false)

                 }
                 doc.data() && setChats(doc.data())
             });
             const unsubRequests = onSnapshot(doc(db, "friendRequests", currentUser.uid), (doc) => {
                 doc.data() && setRequests(doc.data())
                 setRequestsActivity(handleActivity(Object.entries(doc.data()).length))
             });
             return () => {
                 unsubChats()
                 unsubRequests()

             }
         }
         currentUser.uid && getInfo()
     }, [currentUser.uid])

     useEffect(() => {
         const close = (e) => {
             if (sideOpen && e.x > 185) {
                 closeSide()
             }
         }
         document.addEventListener('click', close)
         return () => {
             document.removeEventListener('click', close)
         }
     }, [sideOpen])

     useEffect(() => {
         const close = (e) => {
             if (isNewChat && e.target.id === 'NewChat') {
                 setisNewChat(false)
             }
         }
         document.addEventListener('click', close)
         return () => document.removeEventListener('click', close)
     }, [isNewChat])

     const handleSelect = async (user) => {
         dispatch({ type: 'CHANGE_USER', payload: user })
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
    requests,
    requestsActivity,
    isError,
    isLoading,
    setIsLoading
      }
  }>
    {children}
  </ChatContext.Provider>
 }

 const useGlobe = () => {
     return useContext(ChatContext)
 }
 export { useGlobe, ChatProvider }