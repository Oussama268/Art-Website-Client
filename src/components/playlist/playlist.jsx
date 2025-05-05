import React from 'react'
import { Image ,Box, background, Popover, PopoverTrigger, Text, Divider} from '@chakra-ui/react'
import { ref, getDownloadURL } from 'firebase/storage'
import { useState, useEffect } from 'react'
import { imageDb } from '../../config/config'
import axios from 'axios'
import Loading from'./loading.gif'
import { NavLink, useNavigate } from 'react-router-dom'


function Playlist({playlistId, playlist}) {
    const [image,setImage]= useState("")
    const [imageRef, setImageRef] = useState("")
    const navigate = useNavigate()


    const toPlaylist = () => {

        navigate(`/playlist/${playlist.title}`)

    }


    useEffect(() => {

        const firstpostId = Object.keys(playlist.postsId)[0]

        

        axios.get(`https://art-website-server-production.up.railway.app/posts/${firstpostId}`)
        .then((response) => {

            
            const imageRefernce = ref(imageDb, response.data.postImg)
            
            getDownloadURL(imageRefernce)
            .then((url) => {
            setImage(url)
        })

    })

    }, [])
    

  return (

<>
    <Box
      position="relative"
      w={"110%"}
      margin="1%"
      display={"flex"}
      flexDirection={"row"}
      
    >
        {/* Dark Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="110%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.25)" // Adjust opacity as needed
        zIndex="1"
      />

      {/* View More Box */}
      
      <Box
      onClick={toPlaylist}
        position="absolute"
        top="40%" /* Adjust this value as needed */
        left="21.6%"
        transform="translateX(-50%)"
        padding="5px 10px"
        borderRadius="5px"
        color="white"
        textAlign="center"
        zIndex="2"
        fontSize={"23px"}
        _hover={{ cursor: "pointer" }}
      >
        [View More]
      </Box>
      
        <Box mr={"50px"}>
            <Image
                src={image}
                width="250px"
                height="200px"
                objectFit="cover"
                fallbackSrc={Loading}
                
            />
        </Box>
        <Box m={"auto"} display={"flex"} flexDirection={"column"} >
            <Box>
                <Text color={"white"} fontSize={"28px"}>[ {playlist.title} ]</Text>
            </Box>
            <Box>
                <Text fontWeight={"light"} color={"#d3d3d3"} fontSize={"15px"}>{playlist.description}</Text>
            </Box>
        </Box>
    </Box>
    <Divider color={"white"} border={"1px"} mt={"30px"} ></Divider>
</>
    
  )
}

export default Playlist