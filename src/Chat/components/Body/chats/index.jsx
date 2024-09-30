import ChatsReusable from './chatsReusable.jsx'
import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import NewChat from './newChat.jsx'
import {useGlobe} from '../../../context.jsx'
import { EditOutlined, FilterListOutlined} from '@mui/icons-material';
import {useState,useEffect} from 'react'
const Chats =()=>{
	const {isNewChat,setisNewChat}= useGlobe()
	const [search,setSearch]= useState('')

	 const handleSearch=(e)=>{
		 	e.preventDefault()
		 	setSearch(e.target.value)
		 }
 return <article>
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
 	<ChatsReusable search={search}/>
 		<NewChat/>
 </article>	
}
export default Chats 