import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from './chats.module.css'
import NewChat from './newChat.jsx'
import {Skeleton} from '@mui/material'
import { EditOutlined, FilterListOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import {useGlobe} from '../../../context.jsx'
import {useState} from 'react'

const Chats =()=>{
	const {setSubOpen,isNewChat,setisNewChat,chats,handleSelect}= useGlobe()
		const [search,setSearch]= useState('')
		 const handleSearch=(e)=>{
		 	e.preventDefault()
		 }
	const navigate=useNavigate()
	return <article className={styles.chats}>
		<Title 
		text='Chats'
		button={[<EditOutlined onClick={()=>setisNewChat(!isNewChat)}/>,<FilterListOutlined/>]}
		/>
		<SearchBar
		placeholder='Search'
		// value={search} 
 		// valuefunc={setSearch}
 		submit={handleSearch}

		/>
		<div className={styles.list_container}>
			<ul className={`${styles.list} ${'d_grid'}`}>
				{ 
					Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(item=>{
						const id=item[0]
						const image =item[0]
						const name = item[1].userInfo.displayName
						const preview=item[1].lastMessage?.text
						const timeStamp=''
						return <li className={`${styles.list_item} ${'flex'} ${'clickable'}`} key={id} onClick={()=>{
							navigate(`${id}`)
							setSubOpen(true)
							handleSelect(item[1].userInfo)
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