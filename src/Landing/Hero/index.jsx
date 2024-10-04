 import styles from './hero.module.css'
 
 import logo from '../.././assets/logo.png'
 import  paula from  '../.././assets/paula.png'
  import hero_girl from  '../.././assets/hero_girl.png'
   import dave  from  '../.././assets/dave.jpg'
    import james  from  '../.././assets/james.png'
  import chat from  '../.././assets/chat.png'
 import {Skeleton,CircularProgress,Button,Rating} from '@mui/material'
import {Add,DragHandle,ArrowForward} from '@mui/icons-material';
import CTO from '.././components/Call_to_action.jsx'
import {useNavigate} from 'react-router-dom'
 const Hero = () => {
 const nav=useNavigate()
     return <section className={styles.hero}>
 	<header className={styles.header}>	
      <nav className={`${styles.nav} ${'flex'}`}>
      	<div className={`${styles.logo} ${'flex'}`}>	
 			<img src={logo} alt='logo'/>
 			<h2 className={styles.logo_name}>	
       		 	Nexly
 			</h2>		
      	</div>	
      	<div className={styles.menu}>	
              <ul className={`${styles.menu_list} ${'flex'}`}>
            <li className={styles.list_item}>Demos</li>
            <li className={styles.list_item}>About</li>
            <li className={styles.list_item}>Blogs</li>
            <li className={styles.list_item}>Pages</li>
            <li className={styles.list_item}>Contact</li>
          </ul>
      	</div>
      	<div className={`${styles.buttons} ${'flex'}`}>	
          <Button variant='text' onClick={()=>nav('/login')}>Login</Button>
          <CTO variant='contained' >
          	Get Started Free
          </CTO>
      	</div>	

      	<div className={styles.menu_toggle}>
      		<DragHandle/>
      	</div>
      </nav>	
 	</header>	

 	<section className={`${styles.hero_page} ${'flex'}`}>
 		<article className={`${'d_grid'}`}>
 		<div className={`${styles.sec1} ${'d_grid'}`}>
 			<h2 className={styles.main_text}>
 			Join the Conversation: Chat, Share, and Collaborate with Nexly
 			</h2>
 			<p>Great software that allows you to chat from any place at any time without any interruption.</p>
 			<CTO variant='contained'>
 				Start Chatting Now <ArrowForward/>
 			</CTO>
 		</div>

 		<div className={`${styles.sec2} ${'flex'}`}>
 			<div className={`${styles.customers} ${'flex'}`}>
 				<div className={`${styles.grid_images} ${'flex'}`}>
 				
 				<span><img src={dave} alt=""/></span>
 				<span><img src={james} alt=""/></span>
 				<span><img src={paula} alt=""/></span>
 			</div>
 			<div >
 				<h3> 200</h3>
 				<p>Happy customers</p>
 			</div>
 			</div>
 			<span className={styles.divider}></span>
 			<div className={styles.rating}>
 				<h3>
 					4.5/5
 				</h3>

 				<div className={`${styles.rating} ${'flex'}`}>
 					<span><Rating name="read-only" value='4' readOnly /></span>
 					<p>Rating</p>
 				</div>
 			</div>
 			
 		</div>
 			
 		</article>

 		<div className={`${styles.Image} ${'d_grid'}`}>
    
 				
 			<div className={styles.image_content}>
 				<span className={styles.circle}></span>
 				<div className={styles.img_main}>
 					<img src={hero_girl} alt=""/>
 				</div>
 				<span className={styles.chat}>
 					<img src={chat} alt=""/>
 				</span>
 			</div>

 		</div>
 	</section>	

 	</section>
 }
 export default Hero