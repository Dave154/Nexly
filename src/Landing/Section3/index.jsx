 import styles from './section3.module.css'
 import image from '../.././assets/lap&tab.png'
 const Section3 = () => {
     return <section className={styles.section3}>
 			<div className={`${styles.section3_container} ${'flex'}`}>	
         		<div className={styles.image}>
         		<img src={image} alt=""/>	
         		</div>
         		<div className={styles.content}>	
 			<h2 className="">	Seamless Real-Time Communication</h2>
 			<p className={styles.deets}>	

				Experience instant messaging with real-time updates. Chat with friends, family, or colleagues without delays.
 			</p>		
         		</div>
 			</div>	
 	</section>
 }
 export default Section3