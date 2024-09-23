import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider} from './context.jsx'
import {BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<AppProvider> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AppProvider>
)
