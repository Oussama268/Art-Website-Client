import React, { useEffect, useState } from 'react'
import { useUserId } from '../../config/UserIdcontext';
import {jwtDecode} from 'jwt-decode';
import MiniArt from '../../components/miniArt/MiniArt';
import { Box, Image, Skeleton, Stack } from '@chakra-ui/react';
import axios from "axios"
import Loading from '../../components/miniArt/loading.gif'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


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
    
    setUserId(decodedToken.userId);
  }, [userId]);

  useEffect(() => {
    axios.get(`https://artuniverse-api.onrender.com/posts`)
      .then(response => {
        
        const items = response.data;
        
        return items
      }).then(items=>{
        setPosts(items);
        
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  
  

  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly"  flexWrap="wrap">
      
    { 
    
    Object.keys(posts).length === 0 ? (     
        <Stack gap={"5%"} display={"flex"} flexDirection="row" alignItems="center" justifyContent="space-evenly"  flexWrap="wrap">
          
            {[...Array(16)].map((_, i) => (
              <Skeleton key={i} height="300px" width="300px" />
            ))}
          

        </Stack>    
    ) 

    : 


    (
  <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
    <Masonry gutter="10px">
    {Object.keys(posts).map(key => {
      const value = posts[key];
      const postId = key
      

      return  (
        <>
            <MiniArt postId={postId} post={value} />

        </>
      )
    })}

    </Masonry>
  </ResponsiveMasonry>

    )

    }    


    </Box>
  );
}
