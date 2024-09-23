import styles from './body.module.css'
import {Routes, Route} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useGlobe} from '../../context.jsx'
import logo from '../../../assets/logo_nbg.png' 
import Sub from './sub.jsx'
 const Body =()=>{
 const {subOpen}=useGlobe()
 	return <section className={`${styles.body} ${'d_grid'}`}>
 		<section className={styles.main}>
 			<Outlet/>
 		</section>
 		<section className={styles.sub}>
 		{
 			!subOpen ? <span className ={styles.logo}>
					<img src={logo} alt='logo' aria-label='logo'/>
			</span> : <Sub/>
			
 		}
 			
 		</section>
 		
 	</section>
 }
 export default Body