
import {useNavigate} from 'react-router-dom'
import {auth,storage,db} from '../firebase.js'
import {signInWithEmailAndPassword ,} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import Auth from './Auth.jsx'



const Login =()=>{
	const navigate =useNavigate()
		const handleSubmit= async(e)=>{
			e.preventDefault()
			const name = e.target[0].value
			const email = e.target[0].value
			const password = e.target[1].value
			const profile_photo=e.target[2].value
			try{

				const response = await signInWithEmailAndPassword(auth, email, password)
				console.log(response.user)
				navigate('/chat')
				
			}catch(error){
				console.log(error)
			}

		}
	return <Auth 
		type='in'
		Func={handleSubmit}
		opp='Register'
	/>
}
export default Login
