 import styles from './section2.module.css'
 import {Quickreply,ContrastOutlined,SecurityOutlined} from '@mui/icons-material'



const list = [
		{
			icon:<ContrastOutlined sx={{color:'#fd6003'}}/>,
			color:'rgba(253, 96, 3,.2)',
			txt:'Personalization',
			deets:'This software is very easy for you to manage. You can use it as you wish.'
		},
		{
			icon:<Quickreply  sx={{color:'#4da44e'}}/>,
			color:'rgba(77, 164, 78,.2)',
			txt:'Instant Messaging',
			deets:'This software is very easy for you to manage. You can use it as you wish.'
		},
		{
			icon:<SecurityOutlined sx={{color:'#FB8E0B'}}/>,
			color:'rgba(251, 142, 11,.2)',
			txt:'Privacy & Security',
			deets:'This software is very easy for you to manage. You can use it as you wish.'
		},

	]
 const Section2=()=>{
 	return <section className={styles.section2}>
 		<div className={`${styles.section2_container} ${'d_grid'}`}>
 		 <h2 className="landing_title">
 		 	Features for a better experience
 		 </h2>
 			<div className={`${styles.section2_content} ${'flex'}`}>
 			{
 				list.map((item,i)=>{
 					const {icon,color,txt,deets}=item
 					return <div className='flex'>
 					<span className={styles.icon} style={{background:color}} >
 						{icon}
 					</span>
 					<div className={styles.cont}>
 						<h4 className={styles.txt}>
 							{txt}
 						</h4>
 						<p className={styles.deets}>
 							{deets}
 						</p>
 					</div>
 				</div>
 				})
 			}
 
 			</div>
 		</div>
 	</section>
 }

 export default Section2