import logo from '../../.././assets/logo_nbg.png'
import styles from './header.module.css'
import { CloudOffOutlined ,ArrowBack } from '@mui/icons-material';
import {CircularProgress} from '@mui/material'
import {useGlobe} from '../.././context.jsx'

import {useNavigate,useLocation} from 'react-router-dom'
const Header =()=>{
	const navigate =useNavigate()
	const location= useLocation()
	const {sideOpen,isError,isLoading}= useGlobe()
	return <header className={styles.header}>
		<nav className={`${styles.nav} ${'flex'}`}>
		<div className={`${styles.back} ${(location.pathname === '/Chat' || location.pathname === '/Chat/Calls' ||  location.pathname === '/Chat/Starred' || location.pathname === '/Chat/Profile')  && styles.inactive}`}>
			<ArrowBack sx={ {fontSize:'1rem'} } onClick={()=>navigate(-1)}/>
		</div>
		<div className='flex'>
			<div className={`${styles.logo} ${'flex'}`}>
				<span>
					<img src={logo} alt='logo' aria-label='logo'/>
				</span>
				<h2>Nexly</h2>
			</div>
			<div className={`${styles.connection} ${(sideOpen) && styles.disabled}`}>
				
				{ 
					isError && <span className={` ${'flex'}`}>
				<CloudOffOutlined/>
				<p> No Connection</p>
				</span>  
				}
				{
					isLoading && <CircularProgress color='inherit' size={20}/>
				}
				
				

			</div>
		</div>
			
		</nav>
	</header>
}

export default Header