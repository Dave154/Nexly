import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import ChatsReusable from '.././chats/chatsReusable.jsx'
import {useState,useEffect} from 'react'
const Archive =()=>{
	const [search,setSearch]= useState('')

	 const handleSearch=(e)=>{
		 	e.preventDefault()
		 	setSearch(e.target.value)
		 }

	return <article>
	<Title 
		text='Archive'
		button={[]}
		/>
		<SearchBar
		placeholder='Search' 
		value={search} 
 		valuefunc={handleSearch}
 		submit={handleSearch}

		/>
		<ChatsReusable filter='archive' search={search}/>
		
	</article>
}
export default Archive