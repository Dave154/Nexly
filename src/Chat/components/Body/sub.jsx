 import styles from './body.module.css'
 import Chat from './chats/chat.jsx'
import {Search} from '@mui/icons-material';
import {Outlet,useParams} from 'react-router-dom'
const Sub =()=>{
	const {id}=useParams()
	return <div className={styles.sub_container}>
	  <Chat/>
	</div>
}
export default Sub