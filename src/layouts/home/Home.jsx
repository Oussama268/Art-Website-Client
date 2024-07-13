import React, { useEffect, useState } from 'react'
import { useUserId } from '../../config/UserIdcontext';
import {jwtDecode} from 'jwt-decode';
import MiniArt from '../../components/miniArt/MiniArt';
import { Box } from '@chakra-ui/react';
import axios from "axios"


export default function Home() {
  const { userId, setUserId } = useUserId();
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }
    const decodedToken = jwtDecode(token);
    console.log('User ID:', decodedToken.userId);
    setUserId(decodedToken.userId);
  }, [userId]);

  useEffect(() => {
    axios.get(`http://ArtUniverse-api.onrender.com/posts`)
      .then(response => {
        console.log("Fetched data:", response.data);
        const items = response.data;
        
        return items
      }).then(items=>{
        setPosts(items);
        console.log(posts)
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  
  

  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly"  flexWrap="wrap">
      
    { 
    
    posts.length === "" ? (     <h1>Wait</h1>     ) 

    : 


    (

    Object.keys(posts).map(key => {
      const value = posts[key];
      const postId = key
      console.log("Key:", key);
      console.log("Value:", value);

      return  <MiniArt postId={postId} post={value} />;
    })

    )

    }    


    </Box>
  );
}
