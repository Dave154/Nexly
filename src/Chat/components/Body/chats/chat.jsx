import {useUniversal} from '../../../.././context.jsx'
import styles from './chat.module.css'
import {Skeleton} from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import {useGlobe} from '../../.././context.jsx'
import {useState,useEffect,useRef} from 'react'
import { doc, onSnapshot ,updateDoc,Timestamp,arrayUnion,serverTimestamp} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db,storage} from '../../../.././firebase.js'
import Message from './message.jsx'
import CancelIcon from '@mui/icons-material/Cancel';
import {Search,Mic , Send,AttachFile,AddReaction,PersonOutlined,ArrowBack} from '@mui/icons-material';
import {CircularProgress,TextField} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const Chat =()=>{

	const navigate=useNavigate()
	const {currentUser,windowHeight} =useUniversal()
	const {isEmoji, setIsEmoji,user,chatId,setSubOpen} = useGlobe()
	const [messages,setMessages] =useState([])
	const [text,setText]=useState('')
	const [img,setImg]=useState(null)
	// const [loader,setLoader]=useState(null)
const handleSend=async(e)=>{
	e.preventDefault()
	  setText('')
	  setImg(null)

  if(img){
const storageRef = ref(storage, chatId);
const uploadTask = uploadBytesResumable(storageRef, img);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   alert(error)
  }, 
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
			await updateDoc(doc(db,'chats',chatId),{
  				messages: arrayUnion({
  					id: Math.random(new Date().getTime().toString()),
  					text,
  					img,
  					senderId:currentUser.uid,
  					date:Timestamp.now()
  				})
  			})
  
    });
  }
);

  }else if(text !== ''){
  			await updateDoc(doc(db,'chats',chatId),{
  				messages: arrayUnion({
  					id: Math.random(new Date().getTime().toString()),
  					text,
  					senderId:currentUser.uid,
  					date:Timestamp.now()
  				})
  			})
  }
  await updateDoc(doc(db,'userChats',currentUser.uid),{
  	
  	[chatId+ '.date']:serverTimestamp(),
  	[chatId+'.lastMessage']:{
  		text,
  		img: img ? true : null,
  	},
  })
  await updateDoc(doc(db,'userChats',user.uid),{
  	[chatId+'.lastMessage']:{
  		text,
  		img: img ? true : null
  	},
  	[chatId+ '.date']:serverTimestamp()
  })
}

useEffect(()=>{
 const unSub= onSnapshot(doc(db,'chats',chatId), (doc)=>{
 	doc.exists() && setMessages(doc.data().messages)
 })
 // setMessages([])
 setText('')
 return ()=> unSub()
},[chatId])
	return <div className={`${styles.chat} ${'d_grid'}`} style={{
		maxHeight: `${windowHeight}px`
	}} >
		<div className={`${styles.chat_top} ${'flex'}`}>
			<div className={`${styles.chat_profile} ${'flex'}`}>
				<ArrowBack onClick={()=> {
					navigate('/chat')
					setSubOpen(false)
				}  }/>
				<div className={`${styles.image} ${'d_grid'}`}>
					{user.photoURL !== 'null'? <img src={user.photoURL} alt=''/>: <PersonOutlined/>}
				</div>
					{ user.displayName ? <h5 className={styles.name}>  {user.displayName}</h5> :<Skeleton  width={'5rem'}/> }
			</div>

		</div>
		<div className={`${styles.chat_container} ${'flex'}`}>
			{messages.map(message=>{
		
				return <div className={`${styles.message_container} ${message?.senderId === currentUser.uid && styles.currentUserCont}`}>
			  		<div className={`${styles.image} ${'d_grid'}`}>
						{(message?.senderId === currentUser.uid) ? 
						<div>
							{currentUser?.photoURL !== 'null' ?  <img src={currentUser?.photoURL } alt=''/> : <PersonOutlined/>}
						</div>
						: <div>
							{user?.photoURL !== 'null' ? <img src={user?.photoURL } alt=''/>:<PersonOutlined/> }
						</div> 
						 }
					</div>		
				<Message message={message} key={message.id} />
				</div>

			})} 
		</div>
		<div className={`${styles.chat_form} ${'d_grid'}`}>
		 	{
		 		img && <div className={styles.file_preview}>
		 		  <span>
		 		  	<img src={img} alt=""/>
		 		  	<i onClick={()=>{
		 		  		setImg(null)
		 		  	}}>
		 		  	 <CancelIcon/>
		 		  	</i>
		 		  </span>
		 		</div>

		 	}				<form action="" className={`${styles.form} ${'flex'}`} onSubmit={handleSend}>
				<label htmlFor="file" className={` ${styles.attach} ${'clickable'}`}>
					<AttachFile/>
					<input id='file'  type="file" accept="image/*" onChange={(e)=>{
				    const file = e.target.files[0]; 
				    if (file && file.type.startsWith('image/')) {
				      const reader = new FileReader();
				      reader.onload = (e) => {
				        setImg(e.target.result); 
				      };
				      reader.readAsDataURL(file); 
				    }
  

					}}/>
				</label>
				 <TextField
          id="outlined-multiline-flexible"
          placeholder='Type in Your Message'
          multiline
          maxRows={4}
         	variant="standard"
          fullWidth 
          value ={text}
          className={styles.chatInput}
          onChange={(e)=>{setText(e.target.value)}}/>
				{/*<input type="text" placeholder=''  value ={text} onChange={(e)=>{setText(e.target.value)}}/>*/}
				<span className= {`${'clickable'}`}>
					{ (text.length > 0 || img) ?  <button type='submit' className={styles.send_msg}>	<Send/> </button>: <Mic/>}
				</span>
			</form>

		</div>
			</div>
	
}
export default Chat
