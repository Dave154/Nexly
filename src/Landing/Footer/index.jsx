 import styles from './footer.module.css'
  import logo from '../.././assets/logo.png'
 const Footer =()=>{
 	return <footer className={`${styles.footer} ${'d_grid'}`}>
 		<article>
 		<div className={`${styles.logo} ${'flex'}`}>	
 			<img src={logo} alt='logo'/>
 			<h2 className={styles.logo_name}>	
       		 	Nexly
 			</h2>		
      	</div>
 			<div className={`${styles.menu} ${'flex'}`}>
 				<a href="#">About</a>
 				<a href="#">Features</a>
 				<a href="#">Work</a>
 				<a href="#">Support</a>
 			</div>
 			<div className={styles.socials}>
 				<ul>
 					<a href="#"></a>
 					<a href="#"></a>
 					<a href="#"></a>
 					<a href="#"></a>
 				</ul>
 			</div>
 		</article>
 		<span></span>
 		<article>
 			
 				  <p> Made by Dave</p>
 			
 			<div className='flex' >
 				<p>Privacy Policy</p>
 				<p>Terms & Conditions</p>
 			</div>
 		</article>
 	</footer>
 }
 export default Footer 