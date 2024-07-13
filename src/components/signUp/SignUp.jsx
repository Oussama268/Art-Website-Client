import React from 'react'
import './SignUp.scss'

import { useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {Input, Text, Stack, Box, InputGroup, InputRightElement, Button, Checkbox, CloseButton,Heading} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import axios from 'axios'
import { useUserId } from '../../config/UserIdcontext'
import {jwtDecode} from 'jwt-decode';


export default function SignUp() {
    const eyeOff=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
    const eyeOn=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("") 
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const { setUserId } = useUserId();
    
    const handleClick = () => setShow(!show)
    

    async function handleUser(e){
      e.preventDefault();
      
        await axios.post(
          'http://ArtUniverse-api.onrender.com/users/sign',
          { username: username, email: email, password: password }
         
        ).then((response) => {
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            const decodedToken = jwtDecode(token);
            console.log('User ID:', decodedToken.userId);
            setUserId(decodedToken.userId);
            navigate('/')
        }).catch((error) => {
          if (error.response && error.response.status === 401) {
            
            setError(error.response.data.error); 
          } else {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred. Please try again.');
          }
        });
    
      }

      useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          
          return;
        }
        console.log(token)
  
  
      },[])

    

    return(
    <div className='SignUpContainer'>
      <Link to="/">
        <CloseButton className='close-button' size='lg' />
      </Link>
      <Heading as='h1' color='teal.400'>SIGN UP</Heading>
      <Box p={5} shadow='md' id='box'>
      <form onSubmit={handleUser} >
         <h4>Username</h4>
        <Input required name='username' onChange={(e) => setUsername(e.target.value)} focusBorderColor='teal.400' marginLeft={"15px"} marginBottom={"20px"} size='md' variant='outline'  htmlSize={4} width="88%" height="35px" />

        <h4>Email</h4>
        <Input required name='email' onChange={(e) => setEmail(e.target.value)} focusBorderColor='teal.400' marginLeft={"15px"} marginBottom={"20px"} size='md' variant='outline'  htmlSize={4} width="88%" height="35px" />

        <h4>Password</h4>
        <InputGroup size='md'  marginLeft={"15px"} marginBottom={"20px"}  variant='outline'  width="88%" >
            <Input required name='password' onChange={(e) => setPassword(e.target.value)}
              focusBorderColor='teal.400'
              pr='4.5rem'
              height="37px"
              type={show ? 'text' : 'password'}
            />
            <InputRightElement width='4.5rem' height="36px">
              <Button h='28px' size='sm' id='eye' onClick={handleClick}>
                {show ? eyeOff : eyeOn}
              </Button>
            </InputRightElement>
      </InputGroup>

        <Button type="submit"  className='button' width={"88%"} colorScheme='teal' color={"white"}  variant="solid">Sign Up</Button>
      </form>

      <h5>Already have an Account ? <Link className='link' to="/sign">Log in</Link></h5>

      </Box>

    </div>
    )
}