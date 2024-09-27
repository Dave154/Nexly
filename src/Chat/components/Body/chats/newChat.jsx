 import styles from './chats.module.css'
import {useGlobe} from '../../.././context.jsx'
import {useUniversal} from '../../../.././context.jsx'
import Search from '.././search.jsx'
import Title from '.././title.jsx'
import {useState} from 'react'
import {db} from '../../../.././firebase.js'
import {collection,query,where,getDocs,getDoc,setDoc,doc, updateDoc, serverTimestamp} from 'firebase/firestore'
import {Skeleton,CircularProgress} from '@mui/material'

 const NewChat =()=>{
 	const {isNewChat, setisNewChat}=useGlobe()
 	const {currentUser} =useUniversal()
 	const [username,setUserName]= useState('')
 	  const [user,setUser]= useState(null)
 	  const [loader ,setLoader] =useState(false)
 	 const handleSearch= async(e)=>{
		 	e.preventDefault()
		 	setLoader(true)
		 	setUserName(e.target[0].value)
		 	try {
		 		const q = await query(collection(db,'users'),where('displayName',"==",username))
		 		const querySnapshot =await getDocs(q)
		 		querySnapshot.forEach((doc)=>{
		 			setUser(doc.data())
		 			setLoader(false)
		 		})
		 	}catch(err){
		 	  alert(err)
		 	  setLoader(false)
		 	}

 	}
 	const handleSelect= async()=>{
 		try {
 		const combinedId= currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
 		console.log(combinedId)
 		const res = await getDoc(doc(db,'chats', combinedId))
 		console.log(user.photoURL,user.displayName)
 		console.log(currentUser.photoURL, currentUser.displayName,user.photoURL)
 			if(!res.exists()){
 			// create a chat in chats collection 
 				await setDoc(doc(db,'chats',combinedId),{messages:[]})
 			// create user chats
 				await updateDoc(doc(db,'userChats',currentUser.uid),{
 					 [combinedId+".userInfo"]: {
 					 	uid:user.uid,
 						displayName: user.displayName,
 						photoURL: `${user.photoURL ? user.photoURL :null}`,
 					 },
 					 [combinedId +'.date']: serverTimestamp()
 				})
 					await updateDoc(doc(db,'userChats',user.uid),{
 					 [combinedId + '.userInfo']: {
 					 	uid: currentUser.uid,
 						displayName: currentUser.displayName,
 						photoURL: `${currentUser.photoURL ? currentUser.photoURL :null}`,
 					 },
 					 [combinedId + '.date']: serverTimestamp()
 				})
 			}
 		}catch(err){
 			alert(err)
 			console.log(err.message)
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
 		 valuefunc={(e)=>{
 		 	setUserName(e.target.value)
 		 	setUser(null)
 		 	setLoader(false)
 			 }
 		 }
 		 submit={handleSearch}
 		 />
		{
			user ?  <div className={`${styles.list_item} ${'flex'} ${'clickable'}`} onClick={handleSelect} >
					<div className={`${styles.image} ${'d_grid'}`}>
						{user.photoURL ? <img src={user.photoURL} alt='photo'/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}

					</div>
					<div className={styles.text}>
					   <div className={`${styles.top} ${'flex'}`}>
							{ user.displayName ? <h5 className={styles.name}> {user.displayName}</h5> :<Skeleton  width={'50%'}/> }
					   </div>
					   <div className={`${styles.bottom} ${'flex'}`}>
						{user.bio ? <p className={styles.preview}>{user.bio}</p> : <Skeleton  width={'80%'}/>}
					   </div>
					</div>
				</div> : <div className={`${'d_grid'}`} style={{
					placeContent:'center',
					paddingTop:'3rem'
				}}>
					{
						loader &&  <CircularProgress color='inherit' size={20}/>
					}

				</div>
		}
 	
 	 </div>
 	</article>
 }
 export default  NewChat 







