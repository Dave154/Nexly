import {useUniversal} from '../../../.././context.jsx'
 import styles from './chat.module.css'
import {useRef,useEffect} from 'react'
import logo from '../../../.././assets/logo.png'
 const Message =({message})=>{
	const {currentUser} =useUniversal()
	const ref = useRef(null)
	useEffect(()=>{
	ref.current?.scrollIntoView({behavior:'smooth'})
},[message])
 	return <div className={`${styles.message_box} ${message?.senderId === currentUser.uid && styles.currentUser}`}  ref={ref}>
 		<div className={styles.message_info}>
 			
 		</div>
 		<div className={`${styles.message_content} ${'d_grid'}`}>
 			{message?.img && 
			<div className={styles.message_img}>
 				<img src={message?.img} alt=""/>
 			</div>
 			}
 			{
 				message?.text !== '' && <p>{message?.text}</p>				
 			}
 		</div>
 	</div>
 }
 export default Message