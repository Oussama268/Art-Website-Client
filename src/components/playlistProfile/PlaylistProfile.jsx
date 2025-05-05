import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from 'react'
import MiniArt from '../miniArt/MiniArt'



function PlaylistProfile() {

    const [posts, setPosts] = useState("")

    const {title} = useParams()


    useEffect(() => {

        axios.get(`${process.env.API_LINK}/playlists/playlistId/${title}`)
        .then((response) => {
          
            const playlistId = response.data.playlistId

            axios.get(`${process.env.API_LINK}/playlists/posts/${playlistId}`)
            .then((response) => {

                
                setPosts(response.data)
            })


        })
        


    }, [])


  return (


<>
    <Text color={"white"} fontSize={"35px"} textAlign={"center"}>{title}</Text>

    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly"  flexWrap="wrap" >
    { 
    
        posts.length === "" ? (    <h1>Wait</h1>     ) 

        : 


        (

        Object.keys(posts).map(key => {
          const value = posts[key];
          const postId = key
          

          return  <MiniArt postId={postId} post={value} />;
        })

        )

    } 
    </Box>
</>

  )
}

export default PlaylistProfile