import styles from './body.module.css'
import {useState} from 'react'
import {Search} from '@mui/icons-material';
const SearchBar =({placeholder,submit,value,valuefunc})=>{
 	return <form action="" className={`${styles.search} ${'flex'}`} onSubmit={submit}>
		<Search/>
		<input type="search" 
		placeholder={placeholder}
	// 	 value={value} 
	// 	 onChange={(e)=> {
	// 		valuefunc(e.target.value)
	// 		console.log(e.target.value)
	// 	}
	// }
	/>
	</form>
}
export default SearchBar