 import {useNavigate} from 'react-router-dom'
 import {ArrowForward} from '@mui/icons-material'
 import {useEffect } from 'react'
 const Landing =()=>{

 	useEffect(()=>{
 		setTimeout(()=>{
 			nav('register')
 		},7000)
 	},[])
 	const nav=useNavigate()
 	return <div className='landing'>
 	<h1>Landing Page In Progress</h1>
 		<button className="flex" onClick={()=>{
 			nav('/register')
 		}}>Get Started <ArrowForward/>  </button>
 	</div>
 	
 }
 export default Landing