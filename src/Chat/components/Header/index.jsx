import logo from '../../.././assets/logo_nbg.png'
import styles from './header.module.css'
import { CloudOffOutlined ,ArrowBack } from '@mui/icons-material';
import {CircularProgress} from '@mui/material'
import {useGlobe} from '../.././context.jsx'

import {useNavigate,useLocation} from 'react-router-dom'
const Header =()=>{
	const {sideOpen,isError,isLoading}= useGlobe()
	return <header className={styles.header}>
		{/*<nav className={`${styles.nav} ${'flex'}`}>
		<div className={`${styles.back} ${(location.pathname === '/Chat' || location.pathname === '/Chat/Calls' ||  location.pathname === '/Chat/Starred' || location.pathname === '/Chat/Profile')  && styles.inactive}`}>
			<ArrowBack sx={ {fontSize:'1rem'} } onClick={()=>navigate(-1)}/>
		</div>
		
			
			
		</nav>*/}
	</header>
}

export default Header