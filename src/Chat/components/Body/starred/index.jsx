import Title from '../title.jsx'
import SearchBar from '../search.jsx'
import styles from '../chats/chats.module.css'
import {Skeleton} from '@mui/material'
import {useNavigate,Outlet} from 'react-router-dom'
const list = [


	]

const Starred =()=>{
	const navigate=useNavigate()
	return <article>
		<Title 
		text='Starred'
		button={[]}
		/>
		<SearchBar
		placeholder='Search'
		/>
		<div className={`${styles.list_container } ${!list.length > 0 && 'd_grid'}`}>
		{
			list.length > 0 ?
			<ul className={`${styles.list} ${'d_grid'}`}>
				{ 

					list.map(item=>{
						const {id,image,name,preview,timeStamp}=item
						return <li className={`${styles.list_item} ${'flex'}`} key={id} onClick={()=>navigate(`${id}`)}>
							<div className={`${styles.image} ${'d_grid'}`}>
								{image ? <img src={image} alt={name}/>: <Skeleton  variant='circular' width={'3rem'} height={'3rem'} />}

							</div>
							<div className={styles.text}>
							   <div className={`${styles.top} ${'flex'}`}>
									{ name ? <h5 className={styles.name}>{name}</h5> :<Skeleton  width={'20rem'}/> }
								    <p className={styles.time}>{timeStamp}</p>	
							   </div>
							   <div className={`${styles.bottom} ${'flex'}`}>
								{preview ? <p className={styles.preview}>{preview}</p> : <Skeleton  width={'30rem'}/>}
									{ preview && 
										<div className={styles.activity}>
									           <span>3</span>
									      </div>
								    }
							   </div>
							</div>
						</li>
					}) 
				}
			</ul>: <p> No Message</p>
		}
			
		</div>
	</article>
}
export default Starred