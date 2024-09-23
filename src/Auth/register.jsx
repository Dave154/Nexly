import {useNavigate} from 'react-router-dom'
import {auth,storage,db} from '../firebase.js'
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {useGlobe} from './context.jsx'
import styles from './auth.module.css'
import Auth from './Auth.jsx'



const Register =()=>{
	const handleSubmit= async(e)=>{
			e.preventDefault()
			const displayName = e.target[0].value
			const email = e.target[1].value
			const password = e.target[2].value
			const profile_photo= e.target[3].value
			try{
				const response = await createUserWithEmailAndPassword(auth, email, password)
				const storageRef = ref(storage, displayName);
				const uploadTask = uploadBytesResumable(storageRef, profile_photo);
				uploadTask.on(

				  (error) => {
				    setError(true)
				    console.log(error)
				  }, 
				  () => {
				    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
				     await updateProfile(response.user,{
				     	displayName,
				     	photoURL:downloadURL
				     
				     })
				     	
				    await setDoc(doc (db, "users", response.user.uid), {
				    	 uid:response.user.uid,
				 		 displayName,
				  		 email,
				  		
				});
				    await setDoc(doc (db,' userChats',response.user.uid),{})
				    });
				  }
				);

					console.log(response.user) 
			}catch(error){
				console.log(error)
			}

 
		}
 return <Auth 
		type='up'
		Func={handleSubmit}
		opp='Login'
	/>
   } 
 export default Register