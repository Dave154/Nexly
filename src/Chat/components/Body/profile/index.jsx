import styles from './profile.module.css'
import {useUniversal} from '../../../.././context.jsx'

const Profile =()=>{
	const {currentUser } =useUniversal()
	console.log(currentUser)
	return <section className={styles.profile}>
		{currentUser.email}
    	
	</section>
} 
export default Profile