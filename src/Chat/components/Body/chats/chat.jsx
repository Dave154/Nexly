import {useUniversal} from '../../../.././context.jsx'
import styles from './chat.module.css'
import {Skeleton} from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import {useGlobe} from '../../.././context.jsx'
import {useState,useEffect,useRef} from 'react'
import { doc, onSnapshot ,updateDoc,Timestamp,arrayUnion,serverTimestamp} from "firebase/firestore";
import {db} from '../../../.././firebase.js'
import Message from './message.jsx'
import {Search,Mic ,Send,AttachFile,AddReaction} from '@mui/icons-material';
const Chat =({id})=>{
	const ref = useRef(null)
	const {currentUser} =useUniversal()
	const {isEmoji, setIsEmoji,user,chatId} = useGlobe()
	const [messages,setMessages] =useState([])
	const [text,setText]=useState('')
	const [img,setImg]=useState(null)
useEffect(()=>{
	
},[messages])
const handleSend=async(e)=>{
	ref.current.scrollIntoView()
	console.log(ref.current.scrollIntoView())
	e.preventDefault()
  if(img){


  }else if(text !== ''){
  			await updateDoc(doc(db,'chats',chatId),{
  				messages: arrayUnion({
  					id: new Date().getTime().toString(),
  					text,
  					senderId:currentUser.uid,
  					date:Timestamp.now()
  				})
  			})
  }
  await updateDoc(doc(db,'userChats',currentUser.uid),{
  	
  	[chatId+ '.date']:serverTimestamp(),
  	[chatId+'.lastMessage']:{
  		text
  	},
  })
  await updateDoc(doc(db,'userChats',user.uid),{
  	[chatId+'.lastMessage']:{
  		text
  	},
  	[chatId+ '.date']:serverTimestamp()
  })

  setText('')
}

useEffect(()=>{
 const unSub= onSnapshot(doc(db,'chats',chatId), (doc)=>{
 	doc.exists() && setMessages(doc.data().messages)
 })
 return ()=> unSub()
},[chatId])
	return <div className={`${styles.chat} ${'d_grid'}`}>
		<div className={`${styles.chat_top} ${'flex'}`}>
			<div className={`${styles.chat_profile} ${'flex'}`}>
				<div className={`${styles.image} ${'d_grid'}`}>
					{false ? <img src='' alt=''/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}
				</div>
					{ user.displayName ? <h5 className={styles.name}>  {user.displayName}</h5> :<Skeleton  width={'5rem'}/> }
			</div>

		</div>
		<div className={`${styles.chat_container} ${'flex'}`} ref={ref}>
			{messages.map(message=>{
				return <Message message={message} />
			})}
		
		</div>
		<div className={`${styles.chat_form} ${'d_grid'}`}>
			<form action="" className={`${styles.form} ${'flex'}`} onSubmit={handleSend}>
				<span className={`${styles.emoji} ${isEmoji && styles.active} ${'clickable'}`} onClick={()=>{

					setIsEmoji(!isEmoji)}}>
					<AddReaction/>
				</span>


				<label htmlFor="file" className={` ${styles.attach} ${'clickable'}`}>
					<AttachFile/>
					<input id='file' type="file" onChange={(e)=>setImg(e.target.value)}/>
				</label>
				<input type="text" placeholder='Type in Your Message'  value ={text} onChange={(e)=>{setText(e.target.value)}}/>
				<span className= {`${'clickable'}`}>
					{ text.length > 0 ?  <button type='submit' className={styles.send_msg}>	<Send/> </button>: <Mic/>}
				</span>
			</form>

		</div>
		{
			isEmoji && <div className={styles.emoji_picker}>
						<EmojiPicker/>	
					</div>
		}
		
			</div>
	
}
export default Chat
