 import styles from './chats.module.css'
import {useGlobe} from '../../.././context.jsx'
import {useUniversal} from '../../../.././context.jsx'
import Search from '.././search.jsx'
import Title from '.././title.jsx'
import {useState} from 'react'
import {db} from '../../../.././firebase.js'
import {collection,query,where,getDocs,getDoc,setDoc,doc, updateDoc, serverTimestamp} from 'firebase/firestore'
import {Skeleton} from '@mui/material'

 const NewChat =()=>{
 	const {isNewChat, setisNewChat}=useGlobe()
 	const {currentUser} =useUniversal()
 	const [username,setUserName]= useState('')
 	  const [user,setUser]= useState(null)
 	 const handleSearch= async(e)=>{
		 	e.preventDefault()
		 	setUserName(e.target[0].value)
		 	try {
		 		const q = await query(collection(db,'users'),where('displayName',"==",username))
		 		const querySnapshot =await getDocs(q)
		 		querySnapshot.forEach((doc)=>{
		 			setUser(doc.data())
		 			
		 		})
		 	}catch(err){

		 		console.log(err,'err')
		 	}
		 	
 	}
 	const handleSelect= async()=>{
 		// check if chat exist
 		// create if not
 		try {
 		const combinedId= currentUser.uid > user.uid ? 
 		currentUser.uid + user.uid 
 		: user.uid + currentUser.uid;
 		const res = await getDoc(doc(db,'chats', combinedId))

 			if(!res.exists()){
 			// create a chat in chats collection 
 				await setDoc(doc(db,'chats',combinedId),{messages:[]})
 			// create user chats
 				await updateDoc(doc(db,'userChats',currentUser.uid),{
 					 [combinedId+".userInfo"]: {
 					 	uid:user.uid,
 						displayName: user.displayName,
 					 },
 					 [combinedId +'.date']: serverTimestamp()
 				})
 					await updateDoc(doc(db,'userChats',user.uid),{
 					 [combinedId + '.userInfo']: {
 					 	uid: currentUser.uid,
 						displayName: currentUser.displayName,
 					 },
 					 [combinedId + '.date']: serverTimestamp()
 				})
 			}
 		}catch(err){
 			console.log(err,'error')
 		}
 		setUserName('')
 		setUser(null)
 		 setisNewChat(false)
 	}
 	return <article className={`${styles.newChat} ${isNewChat && styles.active}`} id='NewChat'>
 	 <div className={styles.newChat_container}>
 	 	<Title text='New chat' button={[]}/>
 		<Search placeholder='Search User' 
 		 value={username} 
 		 valuefunc={(e)=>setUserName(e.target.value)}
 		 submit={handleSearch}
 		 />
		{
			user &&  <div className={`${styles.list_item} ${'flex'} ${'clickable'}`} onClick={handleSelect} >
					<div className={`${styles.image} ${'d_grid'}`}>
						{true ? <img src='' alt=''/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}

					</div>
					<div className={styles.text}>
					   <div className={`${styles.top} ${'flex'}`}>
							{ user.displayName ? <h5 className={styles.name}> {user.displayName}</h5> :<Skeleton  width={'50%'}/> }
					   </div>
					   <div className={`${styles.bottom} ${'flex'}`}>
						{false ? <p className={styles.preview}>{preview}</p> : <Skeleton  width={'80%'}/>}

					   </div>
					</div>
				</div>
		}
 	
 	 </div>
 	</article>
 }
 export default  NewChat 







