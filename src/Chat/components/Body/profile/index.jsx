import styles from './profile.module.css'
import {useUniversal} from '../../../.././context.jsx'
import {PersonOutlined} from '@mui/icons-material'
import {auth} from '../../../.././firebase.js'
import {signOut} from 'firebase/auth'
const Profile =()=>{
	const {currentUser} =useUniversal()
	console.log(currentUser)
	const {displayName,photoURL,email}=currentUser
	return <section className={`${styles.profile} ${'d_grid'}`}>
		<div className={`${styles.image} ${'d_grid'}`}>
			{photoURL ? <img src={photoURL} alt={diplayName}/>: <PersonOutlined fontSize='large'/>}
		</div>
		<div className={styles.name}>
			<h2>{displayName}</h2>
		</div>
		<div className={styles.email}>
		Email
			<p>{email}</p>
		</div>

		<div className={`${styles.logOut} ${'clickable'}`} onClick={()=>{
			signOut(auth)
		}}>
			Logout
		</div>
	</section>
} 
export default Profile