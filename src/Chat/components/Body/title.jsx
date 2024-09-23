 import  styles from './body.module.css'

 const Title =({text,button})=>{
	return <div className={`${styles.title_bar} ${'flex'}`}>
		<h2 className={styles.title}>
			{text}
		</h2>
		<div className={`${styles.buttons} ${'flex'}`}>
			{
				button.map((item,i)=>{
					return <button key={i} className={`${styles.button} ${'clickable'}`}>
						{item}
					</button>
				})
			}
		</div>
	</div>
}
export default Title