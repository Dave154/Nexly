import { useUniversal } from '../../../.././context.jsx'
import styles from './chat.module.css'
import { Skeleton } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import { useGlobe } from '../../.././context.jsx'
import { useState, useEffect, useRef } from 'react'
import { doc, onSnapshot, updateDoc, Timestamp, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../../.././firebase.js'
import Message from './message.jsx'
import CancelIcon from '@mui/icons-material/Cancel';
import { Search, Mic, Send, AttachFile, AddReaction, PersonOutlined, ArrowBack } from '@mui/icons-material';
import { CircularProgress, TextField, LinearProgress } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const Chat = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { currentUser, windowHeight } = useUniversal()
    const { isEmoji, setIsEmoji, user, chatId, setSubOpen } = useGlobe()
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const [dropType, setDropType] = useState('');
    const [dragOver, setDragOver] = useState(false)
    const [upload, setUpload] = useState(null)
    const [loader, setLoader] = useState(null)
    const handleSend = async (e) => {
        e.preventDefault()
        setText('')
        setImg(null)

        if (img) {
        	setUpload(9)
            const storageRef = ref(storage, chatId);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    alert(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        setUpload(100)
                        await updateDoc(doc(db, 'chats', chatId), {
                            messages: arrayUnion({
                                id: Math.random(new Date().getTime().toString()),
                                text,
                                img,
                                senderId: currentUser.uid,
                                date: Timestamp.now()
                            })
                        })
                        setUpload(null)

                    });
                }
            );

        } else if (text !== '') {
            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    id: Math.random(new Date().getTime().toString()),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, 'userChats', currentUser.uid), {

            [chatId + '.date']: serverTimestamp(),
            [chatId + '.lastMessage']: {
                text,
                img: img ? true : null,
            },
        })
        await updateDoc(doc(db, 'userChats', user.uid), {
            [chatId + '.lastMessage']: {
                text,
                img: img ? true : null
            },
            [chatId + '.date']: serverTimestamp()
        })
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
            if (doc.exists()) {
                setLoader(false)
                setMessages(doc.data().messages)
            } else {
                setLoader(true)
            }

        })
        setMessages([])
        setLoader(true)
        setText('')
        return () => unSub()
    }, [chatId])


    // DRAG AND DROP IMAGE ON THE THE CHAT COMPONENT
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragOver(true);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataTransfer = e.dataTransfer;
        // Case 1: Handle URL drag-and-drop from other websites
        if (dataTransfer.items && dataTransfer.items[0].kind === 'string' && dataTransfer.items[0].type === 'text/uri-list') {
            dataTransfer.items[0].getAsString((url) => {
                setImg(url);

            });
        }
        // Case 2: Handle local files (drag-and-drop from the user's file system)
        else if (dataTransfer.files && dataTransfer.files.length > 0) {
            const file = dataTransfer.files[0];

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImg(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
        setDragOver(false)
    };


    return <div className={`${styles.chat} ${'d_grid'}`} style={{
		maxHeight: `${windowHeight}px`
	}}
			 onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
	 >

	{dragOver && 
	<div className={`${styles.drop_image} `} 
        onDrop={handleDrop}>
        <article  className={`${'d_grid'}`}>
        	<h2> Drop Image Here </h2>
        </article>

	</div>
}
		<div className={`${styles.chat_top} ${'flex'}`}>
			<div className={`${styles.chat_profile} ${'flex'}`}>
				<ArrowBack onClick={()=> {
					if(location.pathname.includes('Archive')){
					navigate('/chat/Archive')
					}else if(location.pathname.includes('Starred')){
						navigate('/chat/Starred')
					}else{
						navigate('/chat')
					}
					setSubOpen(false)
				}  }/>
				<div className={`${styles.image} ${'d_grid'}`}>
					{user.photoURL !== 'null'? <img src={user.photoURL} alt=''/>: <PersonOutlined/>}
				</div>
					{ user.displayName ? <h5 className={styles.name}>  {user.displayName}</h5> :<Skeleton  width={'5rem'}/> }
			</div>

		</div>
		<div className={`${styles.chat_container} ${'flex'}`}>
			{ !loader ? messages.map(message=>{
		
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

			}): 
			<div className={` ${ styles.chat_loader} ${'d_grid'}`}>
			 <CircularProgress size='3rem'/>
				
			</div>
	
		 		
		 	
		} 
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

		 	}
		 	{ upload  &&  <LinearProgress variant="determinate" value= {upload} />
		 		
		 }
		 		<form action="" className={`${styles.form} ${'flex'}`} onSubmit={handleSend}>
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