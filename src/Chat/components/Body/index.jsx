import styles from './body.module.css'
import {useNavigate} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useGlobe} from '../../context.jsx'
import {useUniversal} from '../../.././context.jsx'
import logo from '../../../assets/logo_nbg.png' 
import Sub from './sub.jsx'
import {CircularProgress,BottomNavigation,BottomNavigationAction,} from '@mui/material'
import {Chat,Call ,StarBorderOutlined, Archive,Settings,PersonOutlined,People} from '@mui/icons-material';
import  Side from '.././minidrawer'
import {useState,useEffect} from 'react'
 const Body =()=>{
 	const navigate=useNavigate()
 	const {windowHeight}=useUniversal()
 	const {subOpen,isLoading,setIsLoading}=useGlobe()
  	const [value, setValue] = useState('recents');
  	const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(()=>{
  // 	const timeout= setTimeout(()=>{
  // 		if(isLoading){
  // 		setIsLoading(false)
  // 		alert('Timeout')
  // 		}

  // 		return ()=> clearTimeout(timeout)
  // 	},100000)
  // },[isLoading])

  const bottomNavList=[
  		 {
      id:0,
      icon: <Chat/>,
      txt:'Chats',
      route: '',
    },
    {
      id:1,
      icon: <People/>,
      txt:'Request',
      route:'friend_requests'
    },
     {
      id:2,
      icon: <StarBorderOutlined/>,
      txt:'Starred',
      route:'Starred'
    },
    {
      id:3,
      icon: <Archive/>,
      txt:'Archive',
      route:'Archive'
    },
     {
      id:5,
      icon: <PersonOutlined/>,
      txt:'Profile',
      route:'Profile'
    },
  	]

 	return <section className={`${styles.body} ${'d_grid'}`} style={{
 		  height: `${windowHeight}px`
 	}}>
 		<section className={styles.main}>
 		<div className={`${styles.connection} ${!isLoading && styles.disabled} ${'d_grid'}`}>
				 <CircularProgress color='inherit' size={20}/>
		</div>
 			<Outlet/>
 		<div className={styles.bottom_nav}>
 			<BottomNavigation  value={value} onChange={handleChange}>
 			{bottomNavList.map(item=>{
 				 const {id,icon,txt,route} = item;
 				return <BottomNavigationAction
 					key={id}
			        label={txt}
			        value={txt}
			        icon={icon}
			        onClick={()=>navigate(route)}
			      />
			 			})}
    </BottomNavigation>

 		</div>	
 		
 		</section>
 		<section className={`${styles.sub} ${subOpen && styles.sub_mini}`}>
 		{
 			!subOpen ? <span className ={`${styles.logo} ${'logo'}`}>
					<img src={logo} alt='logo' aria-label='logo'/>
			</span> : <Sub/>
			
 		}
 			
 		</section>
 		
 	</section>
 }
 export default Body











