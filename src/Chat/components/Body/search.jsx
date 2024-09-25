import styles from './body.module.css'
import {useState} from 'react'
import {Search} from '@mui/icons-material';
const SearchBar =({placeholder,submit,value,valuefunc})=>{
 	return <form action="" className={`${styles.search} ${'flex'}`} onSubmit={submit}>
		<Search/>
		<input type="search" 
		placeholder={placeholder}
		 value={value} 
		 onChange={	valuefunc}
	/>
	</form>
}
export default SearchBar