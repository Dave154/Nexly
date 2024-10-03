import styles from './section4.module.css'
import CTO from '.././components/Call_to_action.jsx'
 import video from '../.././assets/video1.mp4'
const Section4 = () => {
    return <section className={styles.section4}>
 	<div className={`${styles.section4_container} ${'flex'}`}>	
         	<div className={styles.content}>	
 			<h2 className="">Rich Media Sharing</h2>
 			<p className={styles.deets}>	
 			Share images, videos, and documents in just a few clicks. Make your conversations more engaging with rich media.
 			</p>
 			<button>
 				<CTO variant='contained'>
 				Start Chatting Now
 			</CTO>
 			</button>
 					
         	</div>
         		<div className={styles.video}>
			      <video autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
			        <source src={video} type="video/mp4" />
			        Your browser does not support the video tag.
			      </video>
         		</div>
 			</div>
 	</section>
}
export default Section4