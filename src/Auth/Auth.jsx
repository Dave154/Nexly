import {AuthProvider} from './context.jsx'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import styles from './auth.module.css'
import {Backdrop} from '@mui/material'
import {CircularProgress} from '@mui/material'
// import { GoogleAuthProvider,signInWithPopup} from "firebase/auth";
// import {auth} from '../firebase.js'

const Auth =({type,Func,opp,loading,error})=>{

	return <AuthProvider>
	<section className={`${styles.authentique} ${'d_grid'}`}>
	<Backdrop
	open={loading}
	>
		<CircularProgress color='inherit'/>
	</Backdrop>
		<article className={styles.auth_container}>
			
		<h2>Sign {type} to Nexly</h2>
		<div className={`${styles.auth_content} ${'flex'}`}>

		 <button className={styles.sign_in_with_google}>Sign in witn Google</button>
		 <p className={`${styles.or } ${'flex'}`}>	or sign up with Email</p>
		 <form action="" className={`${styles.auth_form} ${'d_grid'}`} onSubmit={Func}>

		 {
		 	type === 'up' && 
		 <label htmlFor="">
		 	Username:
		 	<input type="text" placeholder='Enter UserName' required />
		 </label>
		 }
		 <label htmlFor="">
		 	Email:
		 	<input type="email" placeholder=' Enter Mail' autoComplete="username" required/>
		 </label>
		 <label htmlFor="">
		 	Password:
		 	<input type="password" placeholder='Enter Passcode'  autoComplete="current-password" required/>
		 </label>
		 
		 	{/*<input type='file'/>*/}
		 	<button type='submit ' className={styles.submit}>Sign {type}</button>
		 </form>
		 {/*{error ? <p>{error}</p> : null}*/}
		 <p>{type === 'in' ? 'Dont': 'Already'} have an account? <Link to={`/${opp}`}>{opp}</Link> </p>
	</div>
		</article>
	</section>
	
	</AuthProvider>
}
export default Auth