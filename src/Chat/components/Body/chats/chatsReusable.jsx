import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from './chats.module.css'
import NewChat from './newChat.jsx'
import {Skeleton} from '@mui/material'
import { EditOutlined, FilterListOutlined,PersonOutlined,ImageOutlined,MoreHoriz,StarBorderOutlined,Star, Archive,Delete} from '@mui/icons-material';
import {Backdrop,CircularProgress,Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
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
		name:'Archive',
		name2:'UnArchive'
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

const ChatsReusable =({filter,search})=>{
const {currentUser} =useUniversal()
const {setSubOpen,chats,handleSelect}= useGlobe()
const [time, setTime] = useState(new Date());
const [visibleID, setVisibleID]= useState('')
const [deleteModal,setDeleteModal]= useState(false)
const [deleteLoading,setDeleteLoading]=useState(false)
const [deleteDeets,setDeletedeets]=useState({
	id:'',
	userId:''
})

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

const closeMenu=(e)=>{
	console.log(e.target)
	if(!e.target.classList.contains('moreOption')){
	setVisibleID(null)
	}

}
  useEffect(()=>{
  	if(visibleID){
  	document.addEventListener('click', closeMenu)
  	}
  	return ()=> document.removeEventListener('click', closeMenu)

  },[visibleID])


  const handleDelete=async()=>{
  	const {id,userId} = deleteDeets
  	setDeleteLoading(true)
  		await updateDoc(doc(db,'userChats',currentUser.uid), {
    	[id+".userInfo"] : deleteField(),
    	[id +'.date']: deleteField(),
    	[id+'.lastMessage']: deleteField(),
    	[id +'.star']: deleteField(),
    	[id+'.archive']: deleteField(),
		[id]:deleteField()
			});
		await updateDoc(doc(db,'userChats',userId), {
    	[id+".userInfo"] : deleteField(),
    	[id +'.date']: deleteField(),
    	[id+'.lastMessage']: deleteField(),
		[id]:deleteField()
			});
  		await deleteDoc(doc(db,'chats',id));
  		setDeleteLoading(false)
  		setDeleteModal(false)

  }
 const handleMoreOption=async(name,id,userId,star,archive)=>{
 	setVisibleID(null)
  	try {

  		if (name.toLowerCase() === 'star'){
			await updateDoc(doc(db,'userChats',currentUser.uid),{
				 [id+".star"]:  !star ,
				 // [id +'.date']: serverTimestamp()
			})
  		}
  		else if (name.toLowerCase() === 'archive'){
			await updateDoc(doc(db,'userChats',currentUser.uid),{
				 [id+".archive"]: !archive,
				 // [id +'.date']: serverTimestamp()
			})
  		}

  	else if(name.toLowerCase() === 'delete'){
  		setDeleteModal(true)	
  		setDeletedeets({
  			id,
  			userId
  		})
  	}
  	}catch (err){
  		console.log(err.message)
  	}
  }
	return <article className={`${styles.chats} ${'d_grid'}`}>
		<div className={`${styles.list_container} `}>
			<ul className={`${styles.list} ${'d_grid'}`}>
				{ 
					Object.entries(chats).filter(item=>{
						if (filter === 'star') {
							return item[1].star
						}else if(filter === 'archive'){
							return item[1].archive
						}else{
							return !item[1].archive
						}
					} ).filter((item)=>{
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
						const star = item[1].star ? item[1].star : false
						const archive = item[1].archive ? item[1].archive : false
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
									{ (lastMessage || item[1].lastMessage?.img) &&  <p className={styles.time}>{(timeStamp === 'Invalid Date' || timeStamp === formattedTime )? 'Just Now': timeStamp}</p>	}
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
									<i className='moreOption' onClick={(e)=>{
										setVisibleID(id)
									}}>
										<MoreHoriz className='moreOption'/>
									</i>
									<div className={`${styles.more_option_deets } ${ id !== visibleID && styles.more_option_hidden}`}>
										<ul className={styles.more_option_list}>
											{moreOptionList.map((item,i)=>{
												const {icon1,icon2,name,name2}= item
												return <li className={`${styles.list_item } ${'clickable'} ${'flex'}`} onClick={()=> handleMoreOption(name,id,userId,star,archive)}>
													
													<i>{(name === 'Star' && star) ? icon2 :  icon1 }</i>
													<p>{(name === 'Archive' && archive) ? name2 :  name }</p>
												</li>
											})}
										</ul>

									</div>
								</div>
						</li>
					})
				}
			
			</ul>
		<Backdrop
		open= {deleteModal}
		>
		<div className={`${styles.delete_modal} ${'d_grid'}`}>
		<div>	
			<p>Are you sure you want to delete? </p>
			<p>Messages can not be recovered</p>
		</div>
			<div className={`${styles.button} ${'flex'}`}>	
			<Button variant="outlined"  size='small' onClick={()=>{
				setDeleteModal(false)
				setDeletedeets({
					id:'',
					userId:''
				})
			}}>
			 Cancel
			</Button>	
			<LoadingButton variant="outlined" color='error' startIcon={<Delete />} loading={deleteLoading} onClick={handleDelete}>
				  Delete
			</LoadingButton>
			</div>
				
			</div>
	</Backdrop>
		</div>
	</article>
}
export default ChatsReusable 