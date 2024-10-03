 import styles from './section5.module.css'
 import image1 from   '../.././assets/dave.jpg'
  import image2 from   '../.././assets/james.png'

const list = [

		{
			title:'Incredible Experience',
			txt:'I recently started using Nexly for my communication needs, and I couldn’t be more pleased! The app offers a seamless real-time messaging experience that keeps me connected with my friends and colleagues. The user-friendly interface makes it easy to navigate, even for those who arent tech-savvy',
			image:image1,
			writer:'David Okpe'
		},
		{
			title:'My Go-TO App',
			txt:'Nexly has become my go-to app for chatting, and I highly recommend it to anyone looking for a reliable and engaging messaging platform!',
			image:image2,
			writer:'James Walter'

		},

	]
 const Section5=()=>{
  	return <section className={styles.section5}>
  		<div className={`${styles.section5_container} ${'d_grid'}`}>
 		 <h2 className="landing_title">
 		 	What our Users think
 		 </h2>
 			<div className={`${styles.section5_content} ${'flex'}`}>
 			{
 				list.map((item,index)=>{
 					const {title,txt,image,writer}= item
 					return <article className='d_grid' key={index}>
 				<div className={styles.content}>
 					<h5 className={styles.review_title}>
 						{title}
 					</h5>
 					<p className={styles.review_text}>
 						{txt}
 					</p>
 				</div>
 				<div className={`${styles.writer} ${'flex'}`}>
 					<span><img src={image} alt=""/></span>
 					<div>
 						<h4 className={styles.review_writer}>
 							{writer}
 						</h4>
 						<p> </p>
 					</div>
 				</div>
 			</article>
 				})
 			}
 			</div>
 		</div>
  	</section>
  }
  export  default Section5