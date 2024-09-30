import './App.css'
import {useState,useEffect} from 'react'
import Chat from './Chat'
import Landing from './Landing'
import Login from './Auth/login.jsx'
import Register from './Auth/register.jsx'
import Chats from './Chat/components/Body/chats'
import Starred from './Chat/components/Body/starred'
import Archive from './Chat/components/Body/archive'
import Profile from './Chat/components/Body/profile'
import { auth } from "./firebase";
import {Routes,Route,Navigate} from 'react-router-dom'
import Sub from './Chat/components/Body/sub.jsx'
import {useUniversal} from './context.jsx'
const chatRoutes=[
      {
        path:'',
        element:<Chats/>,
        subroute:':id'
      },
       {
        path:'calls',
        element:<Starred/>,
        subroute:':id'
      },
       {
        path:'starred',
        element:<Starred/>,
        subroute:':id'
      },
      {
        path:'archive',
        element:<Archive/>,
        subroute:':id'
      },
       {
        path:'profile',
        element:<Profile/>,
        subroute:':id'
      },
       {
        path:':id',
        element:<Sub/>,
        // subroute:':id'
      },
  ]
const App=()=> {
   const {windowWidth,currentUser}= useUniversal()
   
   const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }else{
      return children
    }
   }

  return <Routes>
    <Route path ='/' element={<Landing/>}/>
    <Route path='/Chat' element={ <ProtectedRoute>
    <Chat/>
    </ProtectedRoute>}>
        {
          chatRoutes.map((route,i)=>{
            const {path,element,subroute} = route
            return <Route path={path} key={i} element={element}>
                <Route path={subroute}/> 
            </Route>
     
          })
        }    
    </Route> 

      <Route path= '/login' element={<Login/>}/>
      <Route path= '/register' element={<Register/>}/>

    <Route path= '*' element={<h1>Error</h1>}/>
  </Routes>
}

export default App
