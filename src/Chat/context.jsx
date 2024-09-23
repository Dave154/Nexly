 import React, {useState ,useContext,useEffect} from 'react'


 const ChatContext = React.createContext()


 const ChatProvider =({children}) =>{

  const [sideOpen,setSideOpen] = useState(false)
  const [subOpen,setSubOpen]=useState(false)
  const [chatForm,setChatForm]= useState([])
  const [isEmoji ,setIsEmoji] =useState(false)
  const [isNewChat,setisNewChat] =useState(false)
  const handleSide=()=>{
    setSideOpen(!sideOpen)
  }
  const closeSide =()=>{
  	setSideOpen(false)
  }

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

 	return <ChatContext.Provider value={
 		{
 		sideOpen,
 		handleSide,
 		closeSide,
    subOpen,
    setSubOpen,
    isEmoji,
    setIsEmoji,
    isNewChat,
    setisNewChat
     	}
 	}>
 		{children}
 	</ChatContext.Provider>
 }

 const useGlobe =()=>{
 	return useContext(ChatContext)
 }
 export {useGlobe , ChatProvider}