import {useUniversal} from '../../../.././context.jsx'
 import styles from './chat.module.css'
import {useRef,useEffect} from 'react'
 const Message =({message})=>{
	const {currentUser} =useUniversal()
	const ref = useRef(null)
	useEffect(()=>{
	ref.current?.scrollIntoView({behavior:'smooth'})
},[message])
 	return <div className={`${styles.message_box} ${message?.senderId === currentUser.uid && styles.currentUser}`}  ref={ref}>
 		<div className={styles.message_info}>
 			
 		</div>
 		<div className={styles.message_content}>
 			<p>{message?.text}</p>
 		</div>
 	</div>
 }
 export default Message