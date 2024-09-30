import styles from './profile.module.css'
import {useUniversal} from '../../../.././context.jsx'
import {useGlobe} from '../../.././context.jsx'
import {auth,db,storage} from '../../../.././firebase.js'
import {signOut,updateProfile} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {CircularProgress} from '@mui/material'
import { EditOutlined,PersonOutlined} from '@mui/icons-material';
import {useState,useRef} from 'react'
import { doc, onSnapshot ,updateDoc,Timestamp,arrayUnion,serverTimestamp} from "firebase/firestore";
const Profile =()=>{
	const {currentUser} =useUniversal()
	const {displayName,photoURL,email}=currentUser
	const {isEmoji, setIsEmoji,user,chatId,setSubOpen} = useGlobe()
	const [name,setName] =useState('')
	const [dp , setDp] =useState(null)
	const [editable, setEditable] =useState('false')
	const [uploadProgress,setUploadProgress]= useState(null)
	const citeRef=useRef(null)
	const fileInputRef = useRef(null);
		
	const updateName =async () =>{
		try {
			 await updateProfile(currentUser,{
	         displayName:name,
			})
			 await updateDoc(doc (db, "users", currentUser.uid), {
				 displayName:name,
				});
		  	alert('Profile Updated')
		}catch (err){
			alert(err)
		}
			
	}

const updatePhoto =async (file) =>{
try {
const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)

    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   alert(error)
  }, 
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
			 await updateProfile(currentUser,{
	     	photoURL:downloadURL,
			})
			 await updateDoc(doc (db, "users", currentUser.uid), {
				 photoURL:downloadURL,
				});
  				setUploadProgress(null)
    });
  }
);
}catch (err){
	alert(err)
}
			
	}
	const handleInput=(e)=>{
		setName(e.target.innerText)
		console.log(e)
		if(name.length >= 8 ){
			setEditable('false')
			updateName()
		}
	}
	const handleKeyDown =(e)=>{
		console.log(name)
		if(e.key === 'Enter'){
			setEditable('false')
			updateName()
			
		}
	}
const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setDp(e.target.result); // Set the image preview URL
        updatePhoto(file); 
      };
          

      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
    }
  };

	return <section className={`${styles.profile} ${'d_grid'}`}>
	<div className={styles.profile_photo}>
		    <button className={styles.edit} aria-label='Edit'>
		 <label htmlFor="dp">
		 	 <EditOutlined/>
		 </label>   
			<input type="file" accept="image/*" id='dp'  onChange={handleFileChange} />
		     </button>
		<div className={`${styles.image} ${'d_grid'}`}>
			{photoURL ? <img src={photoURL} alt='Profile Photo'/>: <PersonOutlined fontSize='large'/>}
	{
		 uploadProgress && <div className={`${styles.loader} ${'d_grid'}`}>
			
		</div>
	}	
		</div>
	</div>
		
		<div className={styles.name}>
		{/* <button className={styles.edit} aria-label='Edit' onClick={()=>{
		 setEditable('true')
		  if (citeRef.current) {
		      citeRef.current.focus(); // Focus on the contentEditable cite element
		    }
			}
		} > <EditOutlined/> </button>*/}
			<cite  onKeyDown={handleKeyDown} onInput={handleInput} ref={citeRef}>{displayName}</cite>
			<p> Max 8 Chars</p>
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