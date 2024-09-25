import styles from './profile.module.css'
import {useUniversal} from '../../../.././context.jsx'

const Profile =()=>{
	const {currentUser } =useUniversal()
	return <section className={styles.profile}>
		{currentUser.email}
    	
	</section>
} 
export default Profile