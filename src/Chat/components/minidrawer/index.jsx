import {useState} from 'react'
import styles from './miniDrawer.module.css'
import { Menu,Chat,Call ,StarBorderOutlined, Archive,Settings,PersonOutlined} from '@mui/icons-material';
import {useGlobe} from '../.././context.jsx'
import {useNavigate,useLocation} from 'react-router-dom'
const topList = [

    {
      id:0,
      icon: <Chat/>,
      txt:'Chats',
      route:''
    },
    {
      id:1,
      icon: <Call/>,
      txt:'Calls',
      route:'Calls'
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

  ]

const bottomList =[
     {
      id:0,
      icon: <Settings/>,
      txt:'Setting',
      route:'Setting'
    },
     {
      id:1,
      icon: <PersonOutlined/>,
      txt:'Profile',
      route:'Profile'
    },

  ]
const Side =()=>{
  const navigate=useNavigate()
  const location = useLocation()
  const {sideOpen,handleSide,closeSide}=useGlobe()
  return <aside className={`${styles.sideBar } ${sideOpen && styles.active}`}>
    <div className={`${styles.sideBar_container} ${'d_grid'}`}>
    <div className={styles.content1}>
  
      <Menu 
      onClick={handleSide}
      className={styles.menu_bar}
      />
      <ul className={`${styles.list } ${'d_grid'}`}>
        {
          topList.map((item)=>{
        const {id,icon,txt,route} = item;
        console.log(route)
        return <li key={id} className ={`${styles.list_item} ${location.pathname === `/Chat/${route}` && styles.active}`} onClick={()=>{
          navigate(route)
          closeSide()
        }}> 
          <div className={styles.left}>
          {icon}
         <p>{txt}</p>
          </div>

          <div className={styles.activity}>
          <span>3</span>
          </div>
        </li>
      })
        }
      </ul>
    </div>
      <div className={styles.content2}>
        
      <ul className={`${styles.list } ${'d_grid'}`}>
        {
          midList.map((item)=>{
        const {id,icon,txt,route} = item;

        return <li key={id} className ={`${styles.list_item} ${location.pathname === `/Chat/${route}` && styles.active}`} onClick={()=>{
          navigate(route)
          closeSide()
        }}> 
          <div className={styles.left}>
          {icon}
         <p>{txt}</p>
          </div>

          <div className={styles.activity}>
          <span>3</span>
          </div>
        </li>
      })
        }
      </ul>
      <ul className={`${styles.list } ${'d_grid'}`}>
        {
          bottomList.map((item)=>{
        const {id,icon,txt,route} = item;

        return <li key={id} className ={`${styles.list_item} ${location.pathname === `/Chat/${route}` && styles.active}`} onClick={()=>{
          navigate(route)
          closeSide()
        }}> 
          <div className={styles.left}>
          {icon}
         <p>{txt}</p>
          </div>

          <div className={styles.activity}>
           <span>3</span>
          </div>
        </li>
      })
        }
      </ul>
      </div>
    </div>
  </aside>
}
export default Side