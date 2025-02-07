import './MiniArt.scss'
import Loading from'./loading.gif'
import Loadingpfp from'./loadingpfp.png'
import { Image ,Box} from '@chakra-ui/react'
import { ref, getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { imageDb } from '../../config/config'
import { useUserId } from '../../config/UserIdcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MiniArt({postId , post }){

    let message=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    let like=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
    let save = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    const [image,setImage]= useState("")
    const [bgImage,setbgImage]= useState("")
    const [user,setUser]=useState("")
    const [bgImageref,setbgImageref]=useState("")
    const [likeBy,setlikeBy]=useState("")
    const [newLike,setNewLike]=useState(0)
    const userId=useUserId()
    const navigate = useNavigate()
    const imageref = ref(imageDb, post.postImg)

    const Like = () => {
      axios.post(`https://artuniverse-api.onrender.com/posts/like/${postId}`, { userId: userId.userId })
          .then((res) => {
            newLike==0?
              setNewLike(post.likes.counter +1):
              setNewLike(0)
               
          })
          .catch(error => {
              console.error("Error in liking post:", error.message); 
          });
  };

  const unLike = () => {
    axios.post(`https://artuniverse-api.onrender.com/posts/unlike/${postId}`, { userId: userId.userId })
        .then((res) => {
          newLike==0?
          setNewLike(post.likes.counter -1):
          setNewLike(0)
            
        })
        .catch(error => {
            console.error("Error in liking post:", error.message); 
        });
  };



  const toProfile = () => {

    navigate(`/profile/${user.username}`)
  }
    
    useEffect(() => {
      axios.get(`https://artuniverse-api.onrender.com/users/${post.userId}`)
          .then((result) => {
              setlikeBy(Object.keys(post.likes.likeBy))
              setUser(result.data);
              const bgImageref = ref(imageDb, result.data.profileImg);
              setbgImageref(bgImageref);
          })
          .catch((error) => {
              console.error('Error fetching user data:', error);
          });
  }, []);

  useEffect(() => {
    if (bgImageref) {
      getDownloadURL(bgImageref)
        .then((url) => {
          setbgImage(url);
          
        })
    }
  }, [bgImageref]);


  getDownloadURL(imageref)
        .then((url) => {
        setImage(url)
    })
  
  
  

    
    

    
return(

    <Box
      
      position="relative"
      width="fit-content"
      height="fit-content"
      margin="1%"
      _hover={{ "& > .info": { display: "flex" } }}
      >
      <Image
        src={image}
        width="300px"
        height="300px"
        objectFit="cover"
        fallbackSrc={Loading}
      />


      <Box
        className='info'
        position="absolute"
        top="0"
        right="0"
        width="100%" 
        height="100%" 
        display="none"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-end"
        padding="1rem"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        color="white"
      >
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <Box display="flex" onClick={toProfile} _hover={{ cursor: "pointer" }} >
            
                    <Image 
                    src={bgImage}
                    borderRadius="50%"
                    alt="Description of the image"
                    objectFit="cover"
                    fallbackSrc={Loadingpfp}
                    marginRight="0.5rem" 
                    width="30px" 
                    height="30px"
                   />
                  <div _hover={{ cursor: "pointer" }} >{user.username}</div>
                </Box>
            <Box _hover={{ cursor: "pointer" }}>{save}</Box>
        </Box>
        
        
        <Box display="flex" width="100%" justifyContent="space-between">
            
              { 
              newLike!=0?(
                newLike==post.likes.counter +1?
                <Box display="flex" justifyContent='space-between' alignContent="center" width="19%">
                  
                  <Box _hover={{ cursor: "pointer" }} color="teal" onClick={unLike}>{like}</Box>
                  <Box paddingTop="3px" >{newLike -1}</Box>

                </Box>:
              <Box display="flex" alignContent="center" width="19%">
                  
                <Box _hover={{ cursor: "pointer" }} onClick={Like}>{like}</Box>
                <Box paddingTop="2px" ml={"8px"} >{newLike -1}</Box>

              </Box>
              )
                
                :
                likeBy.includes(userId.userId)===true?
                <Box display="flex" alignContent="center" width="19%">
                  
                  <Box _hover={{ cursor: "pointer" }} color="teal" onClick={unLike}>{like}</Box>
                  <Box paddingTop="2px" ml={"8px"}>{post.likes.counter -1}</Box>

                </Box>
                
                :
                <Box display="flex" alignContent="center" width="19%">
                
                  <Box _hover={{ cursor: "pointer" }} onClick={Like}>{like}</Box>
                  <Box paddingTop="2px" ml={"8px"}>{post.likes.counter -1}</Box>
                
                </Box>
              }
              
              
            
            <Box _hover={{ cursor: "pointer" }}>{message} </Box>
            
        </Box>
      </Box>
    </Box>

    )
}