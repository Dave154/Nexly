import {Skeleton,CircularProgress,Button,Rating} from '@mui/material'
import {Add,DragHandle,ArrowForward} from '@mui/icons-material';
import styles from './cto.module.css'
import {useNavigate} from 'react-router-dom'
 const CTO=({variant,children})=>{
 	const nav=useNavigate()
 return	<div className={styles.button}>
 <Button variant={variant} onClick={()=>nav('/register')}> {children}</Button>	
 </div>

 }
 export default CTO