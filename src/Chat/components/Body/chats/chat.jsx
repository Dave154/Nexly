 import styles from './chat.module.css'
 import {Skeleton} from '@mui/material'
 import EmojiPicker from 'emoji-picker-react'
import {useGlobe} from '../../.././context.jsx'
import {Search,Mic ,Send,AttachFile,AddReaction} from '@mui/icons-material';
const Chat =({id})=>{
	const {isEmoji, setIsEmoji} = useGlobe()
	console.log(isEmoji)
	return <div className={`${styles.chat} ${'d_grid'}`}>
		<div className={`${styles.chat_top} ${'flex'}`}>
			<div className={`${styles.chat_profile} ${'flex'}`}>
				<div className={`${styles.image} ${'d_grid'}`}>
					{false ? <img src='' alt=''/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}
				</div>
					{ true ? <h5 className={styles.name}> Dave </h5> :<Skeleton  width={'5rem'}/> }
			</div>

		</div>
		<div className={`${styles.chat_container} ${'d_grid'}`}>
				{id}

		</div>
		<div className={`${styles.chat_form} ${'d_grid'}`}>
			<form action="" className={`${styles.form} ${'flex'}`}>
				<span className={`${styles.emoji} ${isEmoji && styles.active} ${'clickable'}`} onClick={()=>{

					setIsEmoji(!isEmoji)}}>
					<AddReaction/>
				</span>


				<span className={` ${styles.attach} ${'clickable'}`}>
					<AttachFile/>
				</span>
				<input type="text" placeholder='Type in Your Message' />
				<span className= {`${'clickable'}`}>
					{ true ?  <Send/> : <Mic/>}
				</span>
			</form>

		</div>
		{
			isEmoji && <div className={styles.emoji_picker}>
						<EmojiPicker/>	
					</div>
		}
		
			</div>
	
}
export default Chat
