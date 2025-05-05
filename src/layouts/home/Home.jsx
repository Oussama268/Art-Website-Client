import { useEffect, useState } from 'react'
import { useUserId } from '../../config/UserIdcontext';
import {jwtDecode} from 'jwt-decode';
import MiniArt from '../../components/miniArt/MiniArt';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import axios from "axios"
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
    axios.get(`https://art-website-server-production.up.railway.app/posts`)
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

        [...Array(16)].map((_, i) => (
          <Stack
            key={i} 
            position="relative"
            width="fit-content"
            height="fit-content"
            margin="1%"
            _hover={{ "& > .info": { display: "flex" } }}
          >
            <Skeleton height="300px" width="300px" />
          </Stack>
        ))

    ) :

    (
  
    Object.keys(posts).map(key => {
      const value = posts[key];
      const postId = key
      

      return  (
        <>
            <MiniArt postId={postId} post={value} />

        </>
      )
    })

  

    )

    }    


    </Box>
  );
}
