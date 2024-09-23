import styles from './chat.module.css'
import {ChatProvider} from './context.jsx'
import Side from './components/miniDrawer'
import Header from './components/Header'
import Body from './components/Body'
 import Grid from '@mui/material/Grid'
const Index =()=>{
	return <ChatProvider>
	<Grid container>
		<Header/>
		<Side/>
		<Body/>
	</Grid>
	</ChatProvider>
	
}
export default Index

