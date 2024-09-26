import styles from './body.module.css'
import {useState} from 'react'
const SearchBar =({placeholder,submit,value,valuefunc})=>{
 	return <form action="" className={`${styles.search} ${'flex'}`} onSubmit={submit}>
		<input type="search" 
		placeholder={placeholder}
		 value={value} 
		 onChange={	valuefunc}
	/>
	</form>
}
export default SearchBar