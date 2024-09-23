import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from './chats.module.css'
import NewChat from './newChat.jsx'
import {Skeleton} from '@mui/material'
import { EditOutlined, FilterListOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import {useGlobe} from '../../../context.jsx'
import {useState} from 'react'
const list = [
	{	
		id:'1',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'2',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'3',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'4',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'5',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'6',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'7',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'8',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},
	{	
		id:'9',
		image:'',
		name:'',
		preview:'',
		timeStamp:' 7:10AM',
	},


	]

const Chats =()=>{
	const {setSubOpen,isNewChat,setisNewChat}= useGlobe()
		const [search,setSearch]= useState('')
		 const handleSearch=(e)=>{
		 	e.preventDefault()
		 	console.log(e.target[0].value)
		 }
	const navigate=useNavigate()
	return <article className={styles.chats}>
		<Title 
		text='Chats'
		button={[<EditOutlined onClick={()=>setisNewChat(!isNewChat)}/>,<FilterListOutlined/>]}
		/>
		<SearchBar
		placeholder='Search'
		value={search} 
 		valuefunc={setSearch}
 		submit={handleSearch}

		/>
		<div className={styles.list_container}>
			<ul className={`${styles.list} ${'d_grid'}`}>
				{ 
					list.map(item=>{
						const {id,image,name,preview,timeStamp}=item
						return <li className={`${styles.list_item} ${'flex'} ${'clickable'}`} key={id} onClick={()=>{
							navigate(`${id}`)
							setSubOpen(true)
						}}>
							<div className={`${styles.image} ${'d_grid'}`}>
								{image ? <img src={image} alt={name}/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}

							</div>
							<div className={styles.text}>
							   <div className={`${styles.top} ${'flex'}`}>
									{ name ? <h5 className={styles.name}>{name}</h5> :<Skeleton  width={'50%'}/> }
								    <p className={styles.time}>{timeStamp}</p>	
							   </div>
							   <div className={`${styles.bottom} ${'flex'}`}>
								{preview ? <p className={styles.preview}>{preview}</p> : <Skeleton  width={'80%'}/>}
									{ preview && 
										<div className={styles.activity}>
									           <span>3</span>
									      </div>
								    }
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