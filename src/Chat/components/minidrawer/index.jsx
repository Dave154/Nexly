import {useState} from 'react'
import {useUniversal} from '../../.././context.jsx'
import styles from './miniDrawer.module.css'
import { Menu,Chat,Call ,StarBorderOutlined, Archive,Settings,PersonOutlined,People} from '@mui/icons-material';
import {useGlobe} from '../.././context.jsx'
import {useNavigate,useLocation} from 'react-router-dom'

const Side =()=>{

  const {currentUser} =useUniversal()
  const {displayName,photoURL,email}=currentUser
  const navigate=useNavigate()
  const location = useLocation()
  const {sideOpen,
  handleSide,
  closeSide,
  requestsActivity}=useGlobe()
  const topList = [

    {
      id:0,
      icon: <Chat/>,
      txt:'Chats',
      route: '',
    },
    {
      id:1,
      icon: <People/>,
      txt:'Freind Requests',
      route:'friend_requests',
      activity:requestsActivity,
    },
  ]
const midList =[
    {
      id:0,
      icon: <StarBorderOutlined/>,
      txt:'Starred',
      route:'Starred'
    },
    {
      id:1,
      icon: <Archive/>,
      txt:'Archive',
      route:'Archive'
    },
      {
      id:2,
      icon: <Settings/>,
      txt:'Setting',
      route:'Setting'
    },

  ]

const bottomList =[
     {
      id:0,
      icon: <Settings/>,
      txt:'Setting',
      route:'Setting'
    },
   
  ]

  return <aside className={`${styles.sideBar } ${sideOpen && styles.active}`}>
    <div className={`${styles.sideBar_container} ${'d_grid'}`}>
    <div className={styles.content1}>
     <div className='flex'>
         <Menu 
      onClick={handleSide}
      className={styles.menu_bar}
      />
      <h2 className={`${styles.logo}`}>Nexly</h2>
     </div>
    
      <ul className={`${styles.list } ${'d_grid'}`}>
        {
          topList.map((item)=>{
        const {id,icon,txt,route,activity} = item;
        return <li key={id} className ={`${styles.list_item} ${(location.pathname === `/chat/${route}`) && styles.active}`} onClick={()=>{
          navigate(route)
          closeSide()
        }}> 
          <div className={styles.left}>
          {icon}
         <p>{txt}</p>
          </div>

           {
            activity && <div className={styles.activity}>
          <span> {activity}</span>
          </div>
          }
        </li>
      })
        }
      </ul>
    </div>
      <div className={styles.content2}>
        
      <ul className={`${styles.list } ${'d_grid'}`}>
        {
          midList.map((item)=>{
        const {id,icon,txt,route, activity} = item;

        return <li key={id} className ={`${styles.list_item} ${location.pathname === `/chat/${route}` && styles.active}`} onClick={()=>{
          navigate(route)
          closeSide()
        }}> 
          <div className={styles.left}>
          {icon}
         <p>{txt}</p>
          </div>

           {
            activity && <div className={styles.activity}>
          <span> {activity}</span>
          </div>
          }
        </li>
      })
        }
      </ul>
          
          <div className ={`${styles.list_item} ${styles.profile} ${location.pathname === `/chat/profile` && styles.active}`} onClick={()=>{
          navigate('profile')
          closeSide()
        }}> 
        <div className={styles.left}>
           <div className={`${styles.image} ${'d_grid'}`}>
            {photoURL ? <img src={photoURL} alt='profile'/>: <PersonOutlined/>}
          </div>  
           <p>Profile</p>
          </div>
        </div>

      </div>
    </div>
  </aside>
}
export default Side