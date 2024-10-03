import { useUniversal } from '../../../.././context.jsx'
import styles from './chat.module.css'
import { useRef, useEffect ,useState} from 'react'
import logo from '../../../.././assets/logo.png'
import { ImageOutlined } from '@mui/icons-material'
const Message = ({ message }) => {
    const { currentUser } = useUniversal()
    const ref = useRef(null)
    const [imageLoaded,setImageLoaded]=useState(false)
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])
    return <div className={`${styles.message_box} ${message?.senderId === currentUser.uid && styles.currentUser}`}  ref={ref}>
 		<div className={styles.message_info}>
 			
 		</div>
 		<div className={`${styles.message_content} ${'d_grid'}`}>
 			{
 				message?.img && 
			    	<div className={styles.message_img}>
			    	{
			    	  imageLoaded ?
			    		<div className={`${styles.downloadImg} ${'d_grid'}`}>
			    			<ImageOutlined sx={{
			    				fontSize:'3rem',
			    				color:'var(--secondary)'
			    			}} />
			    		</div>	: <img src={message.img} alt=""        
			    		 onLoad={()=>setImageLoaded(false)}
        				 onError={()=>setImageLoaded(true)}/>
			    	}

		 			</div>
 			}
 			{
 				message?.text !== '' && <p>{message?.text}</p>				
 			}
 		</div>
 	</div>
}
export default Message