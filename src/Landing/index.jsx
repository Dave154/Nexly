 import { useNavigate } from 'react-router-dom'
 import { ArrowForward } from '@mui/icons-material'
 import { useEffect } from 'react'
 import './landing.css'
import Particles from './Hero/particles.jsx'
 import Hero from './Hero'
 import Section2 from './Section2'
 import Section3 from './Section3'
 import Section4 from './Section4'
  import Section5 from './Section5'
   import Section6 from './Section6'
      import Footer from './Footer'
 const Landing = () => {
     return <main className='landing'>
     <Particles/>
 		<Hero/>
 		<Section2/>
 		<Section3/>
 		<Section4/>
 		<Section5/>
 		<Section6/>
 		<Footer/>
 	</main>

 }
 export default Landing