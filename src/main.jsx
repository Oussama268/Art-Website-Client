import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react"
import { UserIdProvider } from './config/UserIdcontext.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      
      <ChakraProvider  disableGlobalStyle={true}>
        <UserIdProvider>
          <App />
        </UserIdProvider>
      </ChakraProvider>
      
    </React.StrictMode>
  

)
