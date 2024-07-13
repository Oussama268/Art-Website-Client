import {Input, useDisclosure, useToast, Box, ButtonGroup, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { imageDb } from '../../config/config'
import { ref, getDownloadURL } from 'firebase/storage'
import './profile.scss'
import { useParams } from 'react-router-dom';
import { useUserId } from '../../config/UserIdcontext'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import MiniArt from '../../components/miniArt/MiniArt';
import Playlist from '../playlist/playlist'



export default function Profile() {
  const { onOpen: coverModelOpen, onClose: coverModelClose, isOpen: isCoverModelOpen } = useDisclosure();
  const { onOpen: pfpModelOpen, onClose: pfpModelClose, isOpen: isPfpModelOpen } = useDisclosure();
  const { onOpen: descrModelOpen, onClose: descrModelClose, isOpen: isDescrModelOpen } = useDisclosure();

  const [PfpImage, setPfpImage] = useState()
  const [BgImage, setBgImage] = useState()
  const [user,setUser] = useState([]);
  const {username} = useParams()
  const {userId} = useUserId()
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null)
  const [pfp,setPfp] = useState(null)
  const pfpInputRef = useRef(null)
  const [message,setMessage] = useState();
  const [profileId,setProfileId] = useState();
  const toast = useToast();
  const [islike,islikeSet] = useState(null)
  const [fakeHeartsCounter, setFakeHeartsCounter] = useState(null);
  const [fakeFollowersCounter, setFakeFollowersCounter] = useState(null);
  const [userPosts,setUserPosts] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [playlists, setPlaylists] = useState("")


  //Submiting a cover image change
  const coverButtonClick = () => {
    // Click the hidden file input to choose a file
    
    fileInputRef.current.click();
    
  };

  const coverFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const coverSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }


    let resolvePromise; 
    let rejectPromise; 

    const examplePromise = new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    toast.promise(examplePromise, {
      success: { title: 'Done', description: "Cover picture changed successfully" },
      error: { title: 'Error', description: "Can't change cover picture try again later" },
      loading: { title: 'Pending', description: 'Chnaging cover picture' },
    })
    // Will display the loading toast until the promise is either resolved
    // or rejected.
    

    

    const formData = new FormData(); // Create a FormData object
    formData.append('image', file); // Append the image file to the FormData
    coverModelClose()
    try {
      const response = await axios.post(`https://artuniverse-api.onrender.com/profiles/cover/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      
      console.log('Image uploaded successfully:', response.data);
      setMessage(response.data.message);

      if(response.data.message){
        resolvePromise(200)
      setTimeout(()=> window.location.reload(), 2000);

      }else{

        rejectPromise(401)
      }

     
      
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };



  

  //Submiting a pfp image change

  const pfpButtonClick = () => {
    pfpInputRef.current.click()

  }

  const pfpFileChange = (e) => {

    setPfp(e.target.files[0])

  }

  const pfpSubmit = async (e) => {
    e.preventDefault();
    
    if (!pfp) {
      alert('Please select a file to upload');
      return;
    }


    let resolvePromise; 
    let rejectPromise; 

    const examplePromise = new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    toast.promise(examplePromise, {
      success: { title: 'Done', description: "Profile picture changed successfully" },
      error: { title: 'Error', description: "Can't change profile image try again later" },
      loading: { title: 'Pending', description: 'Chnaging profile picture' },
    })
    // Will display the loading toast until the promise is either resolved
    // or rejected.
    

    

    const formData = new FormData(); // Create a FormData object
    formData.append('image', pfp); // Append the image file to the FormData
    pfpModelClose()
    try {
      const response = await axios.post(`https://artuniverse-api.onrender.com/profiles/pfp/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      
      console.log('Image uploaded successfully:', response.data);
      setMessage(response.data.message);

      if(response.data.message){
        resolvePromise(200)
        setTimeout(()=> window.location.reload(), 2000);

      }else{

        rejectPromise(401)
      }

     
      
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  }


  const descrSubmit = async (e) => {
    e.preventDefault();

    let resolvePromise; 
    let rejectPromise; 

    const examplePromise = new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    toast.promise(examplePromise, {
      success: { title: 'Done', description: "profile description changed successfully" },
      error: { title: 'Error', description: "Can't change profile description try again later" },
      loading: { title: 'Pending', description: 'Chnaging profile description' },
    })



    descrModelClose()
    
      await axios.post(`https://artuniverse-api.onrender.com/profiles/description/${profileId}`, {description: newDescription})
      .then((response) => {
      

      if(response.data.message){
        resolvePromise(200)
        setTimeout(()=> window.location.reload(), 2000);

      }else{

        rejectPromise(401)
      }


      })
      .catch( (error) => {

        console.error('Error changing description', error);

      })
      
      


  }





  const heartProfile = async() => {
    if(!islike){
    await axios.post(`https://artuniverse-api.onrender.com/profiles/like/${profileId}`, {userId: userId,islike: islike})
    .then((response) => {
      console.log(islike)

      console.log(user.hearts_count)
      console.log(fakeHeartsCounter)

      islikeSet(true)
      console.log(islike)
      setFakeHeartsCounter(fakeHeartsCounter + 1)
      console.log(fakeHeartsCounter)

    })


    }else{

      await axios.post(`https://artuniverse-api.onrender.com/profiles/like/${profileId}`, {userId: userId,islike: islike})
    .then((response) => {
      console.log(islike)
      console.log(user.hearts_count)
      console.log(fakeHeartsCounter)
      islikeSet(false)
      console.log(islike)

      setFakeHeartsCounter(fakeHeartsCounter - 1)
      console.log(fakeHeartsCounter)

    })

    }



  } 









    useEffect( () => {
            console.log(userId)
        
            axios.get(`https://artuniverse-api.onrender.com/profiles/${username}`)
            .then(response => {
             
              const data = response.data;
              const firstKey = Object.keys(data)[0];
              console.log(firstKey)
              axios.get(`https://artuniverse-api.onrender.com/posts/userPosts/${firstKey}`)
              .then((response) => {

                 
                 setUserPosts(response.data)

              })

              axios.get(`https://artuniverse-api.onrender.com/playlists/${firstKey}`)
              .then((response) => {

                console.log(response.data)
                setPlaylists(response.data)

             })

              setProfileId(firstKey)
              const firstChild = data[firstKey];
              
              return firstChild

            })
            .then((data) => {
              
              
              console.log(data)
              if(data.followers && data.followers[userId]){
                  islikeSet(true)

              }else{
                islikeSet(false)

              }
              console.log(islike)
              console.log(data)
              console.log(data.profileImg)
              console.log(data.backgroundImg)
              
              setUser(data);
              setNewDescription(data.description)

              setFakeHeartsCounter(data.hearts_count)
              setFakeFollowersCounter(data.followers_count)

              
              const PfpimageRef = ref(imageDb, data.profileImg)
              const BgimageRef = ref(imageDb, data.backgroundImg)

              getDownloadURL(PfpimageRef)
              .then((url) => {
                setPfpImage(url)
              })

              getDownloadURL(BgimageRef)
              .then((url) => {
                setBgImage(url)
              })
          
          })
         
            
            


    },[userId])


    useEffect(() => {

      
    })

    //hooks that need useEffect
    






  return (
    <>
    <div>
      <Box height={"320px"}  position="relative" className='backgroudImg'>
       
        <Image
          loading='lazy'
          objectFit={"cover"}
          width={"100%"}
          height={"100%"}
          src={BgImage}
          alt='BG Image'
          
        />
      
        {
          (userId == profileId) ? 

          <>
            <Button
              className="absolute top-60 right-16 p-6 z-10 w-60"
              position={"absolute"}
              top={"75%"}
              right={"6%"}
              p={"6px"}
              zIndex={"2"}
              w={"250px"}
              colorScheme='blue'
              variant="outline"  
              onClick={coverModelOpen}
              >
                  Change cover image

            </Button>  

          {/* this the pop up that opens when you click profilebackground above */ }
            
          <Modal  blockScrollOnMount={false} isOpen={isCoverModelOpen} onClose={coverModelClose}>
            <ModalOverlay />
          <ModalContent backgroundColor={"#161622"} className='model'>
          <ModalHeader color={"white"} fontSize={"26px"}>Change cover Image</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody alignItems={"center"} justifyContent={"center"}  display={"flex"} flexDirection={"column"}>
            <PhotoSizeSelectActualIcon style={{fontSize: "55", color: "#DCDDE1"}} />
            <Text color={"white"} textAlign={"center"} w={"80%"} m={"10px"} fontWeight='bold' mb='1rem'>
                Select an image to upload
            </Text>
              <Button w={"150px"} onClick={coverButtonClick}>Select Image</Button>
          </ModalBody>

          <ModalFooter>
            <Button color={"white"} variant='ghost' mr={3} onClick={coverModelClose}>
              Close
            </Button>
            <form onSubmit={coverSubmit}>
                <input ref={fileInputRef} style={{ display: 'none' }} type="file" onChange={coverFileChange} accept="image/*" />
                <Button colorScheme='blue' type='submit' isDisabled={file == null}>Apply</Button>
                  
            </form>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
          
           : null

        }

{
          (userId == profileId) ? 

          <>
            <div className="pfpContainer">
              <div class="background-overlay"></div>
              <Box onClick={pfpModelOpen} className="iconBox">
                <AutorenewIcon style={{ fontSize: 55}} className='pfpIcon' />
                <Text fontWeight={"bold"} color={"#2b6cb0"} w={"fit-content"} m={0} fontSize={"22px"}>Change</Text>
              </Box>
            </div>

          {/* this the pop up that opens when you click profile above */ }
            
          <Modal  blockScrollOnMount={false} isOpen={isPfpModelOpen} onClose={pfpModelClose}>
            <ModalOverlay />
          <ModalContent backgroundColor={"#161622"} className='model'>
          <ModalHeader color={"white"} fontSize={"26px"}>Change Profile picture</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody alignItems={"center"} justifyContent={"center"}  display={"flex"} flexDirection={"column"}>
            <PersonOutlineIcon style={{ fontSize: 55, color: "#DCDDE1"}}/>
            <Text color={"white"} textAlign={"center"} w={"80%"} m={"10px"} fontWeight='bold' mb='1rem'>
                Select an image to upload
            </Text>
              <Button w={"150px"} onClick={pfpButtonClick}>Select Image</Button>
          </ModalBody>

          <ModalFooter>
            <Button color={"white"} variant='ghost'  mr={3} onClick={pfpModelClose}>
              Close
            </Button>
            <form onSubmit={pfpSubmit}>
                <input ref={pfpInputRef} style={{ display: 'none' }} type="file" onChange={pfpFileChange} accept="image/*" />
                <Button colorScheme='blue' type='submit' isDisabled={pfp == null}>Apply</Button>
                  
            </form>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
          
           : null

        }
      
        
        
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.3)" 
        />


        

        <Image
        loading='lazy'
          position="absolute"
          top="90%"
          left="50%"
          transform="translate(-50%, -50%)" 
          width={150}
          height={158}
          src={PfpImage}
          alt='PFP Image'
          borderRadius={"6px"}
          objectFit={"cover"}

        />


      
      


      </Box>
     

      
  </div>

    <Box display={"flex"} flexDirection={"row"} p={"4"} justifyContent={"space-around"} className='stats'>
      <Box>
      <Text color={"white"} padding={"0"} margin={"1"} width={"100%"} fontSize={"29px"}>Followers</Text>
      <Box justifyContent={"center"} display={"flex"} flexDirection={"row"} >
        <FavoriteBorderIcon style={{fontSize: 40, color: "#2b6cb0"}} />
        <Text color={"white"} padding={"0"} marginTop={"-11.8px"} marginLeft={"4"} marginRight={"0"} fontSize={"40px"} >{user.followers_count}</Text>
      </Box>
      </Box>
      <Box mt={"38px"}>
        <Text color={"white"} fontSize={"40px"}>{user.username}</Text>
      </Box>
      <Box>
      <Text color={"white"} padding={"0"} margin={"1"} width={"100%"} fontSize={"29px"}>Hearts</Text>
      <Box justifyContent={"center"} display={"flex"} flexDirection={"row"} >
        <FavoriteBorderIcon  onClick={heartProfile} style={{fontSize: 40, color: "#2b6cb0"}} />
        <Text color={"white"} marginTop={"-11.8px"} marginLeft={"4"} marginRight={"0"} fontSize={"40px"} >
          
          {
          islike ?
          fakeHeartsCounter : 
          user.hearts_count
          
        }
          </Text>
      </Box>
      </Box>
    </Box> 
    
    <Box display={"flex"} flexDirection={"row"} p={"4"} justifyContent={"space-between"}  m={"20px"} mt={"60px"} flexWrap="wrap">
        <Box w={"550px"} mt={"70px"}>
            <h1>PlayLists</h1>
            <Box w={"100%"} display="flex" ml={"auto"} flexDirection="column" justifyContent={"space-evenly"} >
      
                  { 
                  
                  playlists.length === 0 ? (     <Text color={"white"} fontSize={"24px"} ml={"18px"}>No playlists</Text>     ) 
                  
                  : 
                  
                  
                  (
                  
                  Object.keys(playlists).map(key => {
                    const value = playlists[key];
                    const playlistId = key
                  
                  
                    return  <Playlist playlistId={playlistId} playlist={value} />;
                  })
                
                  )
                
                  }    
              
                
              </Box>
        </Box>












        <Box w={"650px"} mt={"70px"}>
          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <h1 style={{marginBottom: "0px"}}>About {user.username}</h1>
              {
            (userId == profileId) ? (
            <Box onClick={descrModelOpen} _hover={{cursor: "pointer"}} display={"flex"} >
              <EditIcon  style={{fontSize: 28, color: 'white', margin: "auto"}} />
              <Text margin={"auto"} color={"white"} >Edit</Text>
            </Box> ) : null
          }

            
            {/* this the pop up that opens when you click edit above */ }
            <Modal  blockScrollOnMount={false} isOpen={isDescrModelOpen} onClose={descrModelClose}>
            <ModalOverlay />
            <ModalContent height={"600px"}  backgroundColor={"#161622"} className='model'>
            <form onSubmit={descrSubmit}>
                <ModalHeader color={"white"} fontSize={"26px"}>Edit Desciption</ModalHeader>
                <ModalCloseButton color={"white"} />
                <ModalBody alignItems={"center"} justifyContent={"center"}  display={"flex"} flexDirection={"column"}>
                    
                    <textarea style={{width: "95%", height: "420px", fontSize: "18px", fontWeight: "bolder", padding: "10px"}}  onChange={(e) => setNewDescription(e.target.value)}>{newDescription}</textarea>
                </ModalBody>

                <ModalFooter>
                  <Button color={"white"} variant='ghost'  mr={3} onClick={descrModelClose}>
                    Close
                  </Button>
                
                  <Button colorScheme='blue' type='submit' isDisabled={newDescription == user.description}>Apply</Button>
                  
                </ModalFooter>
                </form>
            </ModalContent>
        </Modal>

          </Box>
          <Box backgroundColor={"#f0f0f0"}rounded={"6"}  boxShadow={"outline"} height={"400px"} >
            <Text fontSize={"18px"} w={"90%"} m={"15px"} p={"15px"}>
              {user.description}
            </Text>
          </Box>
        </Box>
    </Box> 

    <Box m={"34px"} mt={"120px"}>
      <h1>Most Popular</h1>
      <Box>
      <Box display="flex" ml={"auto"} flexDirection="row" justifyContent={"space-evenly"} flexWrap="wrap">
      
      { 
      
      userPosts.length === "" ? (     <h1>Wait</h1>     ) 
  
      : 
  
  
      (
  
      Object.keys(userPosts).map(key => {
        const value = userPosts[key];
        const postId = key
       
  
        return  <MiniArt postId={postId} post={value} />;
      })
  
      )
  
      }    
  
  
      </Box>
      </Box>
    </Box>
  </>
  )
}
