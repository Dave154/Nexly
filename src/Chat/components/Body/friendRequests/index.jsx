import { useState } from 'react'
import styles from './req.module.css'
import Title from '../title.jsx'
import { db } from '../../../.././firebase.js'
import { useUniversal } from '../../../.././context.jsx'
import { useGlobe } from '../../../context.jsx'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, deleteDoc, deleteField } from 'firebase/firestore'
import { PersonOutlined, Add } from '@mui/icons-material';
import { Button ,Skeleton} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const Req = () => {
    const { currentUser } = useUniversal()
    const { requests } = useGlobe()
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [reqId,setReqId]=useState(null)

    const handleAccept = async (user,id) => {
    	setReqId(id)
    	setAcceptLoading(true)
        try {
            await setDoc(doc(db, 'chats', id), { messages: [] })
            // create user chats
            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [id + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: `${user.photoURL ? user.photoURL :null}`,
                },
                [id + '.date']: serverTimestamp()
            })
            await updateDoc(doc(db, 'userChats', user.uid), {
                [id + '.userInfo']: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: `${currentUser.photoURL ? currentUser.photoURL :null}`,
                },
                [id + '.date']: serverTimestamp()
            })
            await updateDoc(doc(db, 'friendRequests', currentUser.uid), {
                [id + ".userInfo"]: deleteField(),
                [id + '.date']: deleteField(),
                [id]: deleteField()
            });
            setReqId(null)
            setAcceptLoading(false)
        } catch (err) {
            alert(err)
            console.log(err.message)
        }

    }
    const handleCancel = async (id) => {
    	try{
    	 await updateDoc(doc(db, 'friendRequests', currentUser.uid), {
                [id + ".userInfo"]: deleteField(),
                [id + '.date']: deleteField(),
                 [id]: deleteField(),
            });    		
    	}catch (err){
    		alert(err)
    	}

    }
   
    return <article>
	<Title 
		text='Freind Requests'
		button={[]}
		/>

		<div className={styles.list_container}>
			<ul className={styles.list}>
				{Object.entries(requests).map(item=>{
             		const id=item[0]
					const user =item[1].userInfo
					const image =item[1].userInfo?.photoURL
					const name = item[1].userInfo?.displayName 
					const userId=item[1].userInfo?.uid
					return  <li className={`${styles.list_item} ${'flex'} ${'clickable'}`} key={id} >
					  <div className={`${styles.left} ${'flex'}`}>
					  	<div className={`${styles.image} ${'d_grid'}`}>
								{image !== 'null' ? <img src={image} alt={name}/>: <PersonOutlined/>}

							</div>
							<div className={styles.text}>
							   <div className={`${styles.top} ${'flex'}`}>
									{ name ? <h5 className={styles.name}>{name}</h5> :<Skeleton  width={'50%'}/> }
							   </div>
							</div>
					  </div>
							
							
							<div className={`${styles.button} ${'flex'}`}>
							<Button variant="outlined" onClick={()=>handleCancel(id)} sx={{
								fontSize:'.5rem',
								width:'.2rem'
							}}  >
							 Cancel
							</Button>	
							<LoadingButton variant="contained"  loading={id === reqId && acceptLoading} onClick={()=>handleAccept(user,id)} sx={{
								fontSize:'.5rem',
								width:'1rem',
								height:'1.5rem'
							}}>
								  Accept
							</LoadingButton>
							</div>
						</li>
				})}
			</ul>
		</div>
	</article>
}
export default Req