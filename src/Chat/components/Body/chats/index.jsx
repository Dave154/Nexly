import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from './chats.module.css'
import NewChat from './newChat.jsx'
import {Skeleton} from '@mui/material'
import { EditOutlined, FilterListOutlined,PersonOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import {useGlobe} from '../../../context.jsx'
import {useUniversal} from '../../../.././context.jsx'
import {useState} from 'react'
import {db} from '../../../.././firebase.js'
import {collection,query,where,getDocs,getDoc,setDoc,doc, updateDoc, serverTimestamp} from 'firebase/firestore'
const Chats =()=>{
		const {currentUser} =useUniversal()
	const {setSubOpen,isNewChat,setisNewChat,chats,handleSelect}= useGlobe()
		const [search,setSearch]= useState('')
		 const handleSearch=(e)=>{
		 	e.preventDefault()
		 	setSearch(e.target.value)
		 }
	const navigate=useNavigate()
	return <article className={`${styles.chats} ${'d_grid'}`}>
		<Title 
		text='Chats'
		button={[<EditOutlined onClick={()=>setisNewChat(!isNewChat)}/>,<FilterListOutlined/>]}
		/>
		<SearchBar
		placeholder='Search'
		value={search} 
 		valuefunc={handleSearch}
 		submit={handleSearch}

		/>
		<div className={`${styles.list_container} `}>
			<ul className={`${styles.list} ${'d_grid'}`}>
				{ 
					Object.entries(chats).filter((item)=>{
						if(search !== ''){
						return item[1].userInfo.displayName.toLowerCase().includes(search)
						}else{
							return item
						}
					} )?.sort((a,b)=>b[1].date - a[1].date).map(item=>{
						const id=item[0]
						const user =item[1].userInfo
						const image =item[1].userInfo?.photoURL
						const name = item[1].userInfo?.displayName
						const preview=item[1].lastMessage?.text.substring(0, 1000);
						const timeStamp=''
						return <li className={`${styles.list_item} ${'flex'} ${'clickable'}`} key={id} onClick={ async ()=>{
							navigate(`${id}`)
							setSubOpen(true)
							handleSelect(user)
							    try{
							    	console.log(item)
          await updateDoc(doc(db,'userChats',currentUser.uid),{
           [id+".userInfo"]: {
            uid:`${user.uid ? user.uid :null}`,
            displayName: `${user.displayName ? user.displayName :null}`,
            photoURL: `${user.photoURL ? user.photoURL :null}`,
           },
        })
          await updateDoc(doc(db,'userChats',user.uid),{
           [id + '.userInfo']: {
            uid: currentUser.uid,
           displayName: `${currentUser.displayName ? currentUser.displayName :null}`,
            photoURL: `${currentUser.photoURL ? currentUser.photoURL :null}`,
           },
        })
        }catch (err){
          console.log(err)
        }
						}}>
							<div className={`${styles.image} ${'d_grid'}`}>
								{image ? <img src={image} alt={name}/>: <PersonOutlined/>}

							</div>
							<div className={styles.text}>
							   <div className={`${styles.top} ${'flex'}`}>
									{ name ? <h5 className={styles.name}>{name}</h5> :<Skeleton  width={'50%'}/> }
								    <p className={styles.time}>{timeStamp}</p>	
							   </div>
							   <div className={`${styles.bottom} ${'flex'}`}>
								{preview && <p className={styles.preview}>{preview}</p>}
									
							   </div>
							</div>
						</li>
					})
				}
			
			</ul>
		</div>
		<NewChat/>
	</article>
}
export default Chats 