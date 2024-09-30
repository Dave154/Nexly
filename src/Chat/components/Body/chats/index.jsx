import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from './chats.module.css'
import NewChat from './newChat.jsx'
import {Skeleton} from '@mui/material'
import { EditOutlined, FilterListOutlined,PersonOutlined,ImageOutlined,MoreHoriz,StarBorderOutlined,Star, Archive,Delete} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import {useGlobe} from '../../../context.jsx'
import {useUniversal} from '../../../.././context.jsx'
import {useState,useEffect} from 'react'
import {db} from '../../../.././firebase.js'
import {collection,query,where,getDocs,getDoc,setDoc,doc, updateDoc, serverTimestamp,deleteDoc,deleteField} from 'firebase/firestore'

const moreOptionList = [
	{
		icon1:<Archive/>, 
		icon2:'',
		name:'Archive'
	},
	{
		icon1:<StarBorderOutlined/>,
		icon2: <Star/>,
		name:'Star'
	},
	{
		icon1:<Delete/>,
		icon2:'',
		name:'Delete'
	}]

const Chats =()=>{
const {currentUser} =useUniversal()
const {setSubOpen,isNewChat,setisNewChat,chats,handleSelect}= useGlobe()
const [time, setTime] = useState(new Date());
const [search,setSearch]= useState('')
const [visibleID, setVisibleID]= useState('')
		 const handleSearch=(e)=>{
		 	e.preventDefault()
		 	setSearch(e.target.value)
		 }
	const navigate=useNavigate()
	useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); 
    }, 1000);
    return () => clearInterval(interval);
  	}, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Ensures 12-hour format with AM/PM
  });

  	const closeMenu=()=>{
  		setVisibleID('')
  	}
  useEffect(()=>{
  	console.log(visibleID)
  	if(!visibleID){
  	document.addEventListener('click', closeMenu)
  	}
  	return ()=> document.removeEventListener('click', closeMenu)

  },[visibleID])

  const handleMoreOption=async(name,id,userId,star)=>{
  	try {

  		if (name.toLowerCase() === 'star'){
			await updateDoc(doc(db,'userChats',currentUser.uid),{
				 [id+".userInfo"]: {
				 	...[id+".userInfo"],
				 	star: !star
				 },
				 // [id +'.date']: serverTimestamp()
			})
  		}

  	else if(name.toLowerCase() === 'delete'){
		await updateDoc(doc(db,'userChats',currentUser.uid), {
    	[id+".userInfo"] : deleteField(),
    	[id +'.date']: deleteField(),
    	[id+'.lastMessage']: deleteField(),
		[id]:deleteField()
			});
		await updateDoc(doc(db,'userChats',userId), {
    	[id+".userInfo"] : deleteField(),
    	[id +'.date']: deleteField(),
    	[id+'.lastMessage']: deleteField(),
		[id]:deleteField()
			});
  		await updateDoc(doc(db,'chats',id), {messages:[]});		
  	}

		console.log(userId,id)
  	}catch (err){
  		console.log(err.message)
  	}
  }
  
	return <article className={`${styles.chats} ${'d_grid'}`}>
		<Title 
		text='Chats'
		button={
			[
				{	
					func: ()=> setisNewChat(!isNewChat),
					icon:<EditOutlined/>
				},
				{		
					icon:<FilterListOutlined/>
				}
			]
		}
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
						const userId=item[1].userInfo?.uid
						const star = item[1].userInfo?.star ? item[1].userInfo?.star : false
						const lastMessage =item[1].lastMessage?.text;
		
						const timeStamp= new Date(item[1].date?.seconds*1000).toLocaleTimeString([],{
							 hour: '2-digit',
						    minute: '2-digit',
						    hour12: true,
						})

						return <li className={`${styles.list_item} ${'flex'} ${'clickable'}`} key={id} >
							<div className={`${styles.image} ${'d_grid'}`}>
								{image !== 'null' ? <img src={image} alt={name}/>: <PersonOutlined/>}

							</div>
							<div className={styles.text} onClick={ async ()=>{
												navigate(`${id}`)
												setSubOpen(true)
												handleSelect(user)
								try{

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
							   <div className={`${styles.top} ${'flex'}`}>
									{ name ? <h5 className={styles.name}>{name}</h5> :<Skeleton  width={'50%'}/> }
									{ (lastMessage || item[1].lastMessage?.img) &&  <p className={styles.time}>{timeStamp === formattedTime ? 'Just Now': timeStamp}</p>	}
							   </div>
							   <div className={`${styles.bottom} ${'flex'}`}>
								{lastMessage && <p className={styles.preview}>{lastMessage} </p>}
								{  
									(!lastMessage && item[1].lastMessage?.img) && 
									<span className={`${'flex'}`}>
									<ImageOutlined/>  <p>Image</p>
									</span>	
								}	

							   </div>
							</div>
							<div className={styles.more_option}>
									<i onClick={(e)=>{
										setVisibleID(id)
									}}>
										<MoreHoriz/>
									</i>
									<div className={`${styles.more_option_deets } ${ id !== visibleID && styles.more_option_hidden}`}>
										<ul className={styles.more_option_list}>
											{moreOptionList.map((item,i)=>{
												const {icon1,icon2,name}= item
												return <li className={`${styles.list_item } ${'clickable'} ${'flex'}`} onClick={()=> handleMoreOption(name,id,userId,star)}>
													<i>{star ? icon2 : icon1}</i>
													<p>{name}</p>
												</li>
											})}
										</ul>

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