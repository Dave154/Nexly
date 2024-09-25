
import {useNavigate} from 'react-router-dom'
import {auth,storage,db} from '../firebase.js'
import {signInWithEmailAndPassword ,} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import Auth from './Auth.jsx'
import {useState} from 'react'


const Login =()=>{
	const navigate =useNavigate()
	const [loading, setLoading]= useState(false)
	const [error,setError]=useState('')
		const handleSubmit= async(e)=>{
			setLoading(true)
			e.preventDefault()
			const name = e.target[0].value
			const email = e.target[0].value
			const password = e.target[1].value
			const profile_photo=e.target[2].value
			try{

				const response = await signInWithEmailAndPassword(auth, email, password)
				console.log(response.user)
				navigate('/chat')
				setLoading(false)
				
			}catch(error){
				setLoading(false)
				  setError(error.code)
				  alert(error.code)
				console.log(error.code,'error')
			}

		}
	return <Auth 
		type='in'
		Func={handleSubmit}
		opp='Register'
		loading={loading}
		error={error}
	/>
}
export default Login
