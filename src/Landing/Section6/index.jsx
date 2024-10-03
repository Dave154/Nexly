 import styles from './section6.module.css'
 import CTO from '.././components/Call_to_action.jsx'
import {Add,DragHandle,ArrowForward} from '@mui/icons-material';
 const Section6 = () => {
     return <section className={styles.section6}>
     <article className={`${styles.section6_container } ${'d_grid'}`}>
     	
     	<div>
     		<h2>
 			Get Started Today!
 		</h2> 
 		<p>		
			Sign up for free and discover the power of real-time communication with Nexly. Start chatting and connecting today
 		</p>

     	</div>
		<button>
 			<CTO variant='contained'>
 				Start chatting <ArrowForward/>
 			</CTO>
 		</button>
     </article>

 		
 	</section>
 }
 export default Section6