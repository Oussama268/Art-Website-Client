import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useUserId } from '../../config/UserIdcontext';
import {Text, Box, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, TagCloseButton, TagLabel, useDisclosure, Wrap, Image, useToast, List, ListItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function Post() {
    //other imports
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const toast = useToast()

    //references
    const imgInputRef = useRef(null);

    //useStates

    const [title,setTitle] = useState()
    const [postImg,setPostImg] = useState(null);
    const { userId }  = useUserId()
    const [tags, setTags] = useState([]);
    const [mytags, setMyTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [isSubmitDisabled,setIsSubmitDisabled] = useState(false)
    const [imagePreview, setImagePreview] = useState();
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const inputRef = useRef(null);
/*miiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii*/
    const handleChange = (e) => {
      const value = e.target.value;
      setCurrentTag(value);
      if (value) {
        
        const filtered = mytags.filter((suggestion) =>
          suggestion.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        
      } else {
        setFilteredSuggestions([]);
      }
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate(`/search/${selectedTerms}`)
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      if (!selectedTerms.includes(suggestion)) {
        setTags([...tags, suggestion]);
        
      }
      setCurrentTag('');
      setFilteredSuggestions([]);
    };


    useEffect(() => {
      axios.get(`art-website-server-production.up.railway.app/tags/`)
          .then((result) => {
             
              setMyTags( Object.keys(result.data));
          })
          .catch((error) => {
              
          });
  }, []);
/*miiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii*/
























    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        
        navigate("/sign")
      }
     

      
  }, [userId])

      useEffect(() => {
        return () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview); // Free memory used by the URL
          }
        };
      }, [imagePreview]); 

    useEffect(() => {
      if(!title || tags.length === 0 || !postImg){
        setIsSubmitDisabled(true)

      }else{
        setIsSubmitDisabled(false)
      }


    },[title, postImg, tags])

    //to check after adding an image Modal is opened
    useEffect(() => {
      if(postImg != null){
        onOpen()
      }

    },[postImg])


    //handle modal close
    const handleClose = () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setPostImg(null)
      onClose()
    }


    //Add tag to tag array
    const addTag = () => {
      if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag('');
      }
    };

    //Remove tag from tag array
    const removeTag = (tagToRemove) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };

    //changing current tag
    const handleInputChange = (e) => {
      setCurrentTag(e.target.value);
    };

    //when touching space in tag input
    const handleTagKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        addTag();
      }
    };

    //to click the hidden input
    const handleInputClick = () => {
      imgInputRef.current.click()

    }

    const PostFileChange = (e) => {
      const file = e.target.files[0];
      if(file){
        setPostImg(file)
        setImagePreview(URL.createObjectURL(file))
  
      }
      
    }



    //create post Form submit
    const handleCreatePost = async (e) => {
      e.preventDefault()
        const tagsObject = tags.reduce((accumulator, tag) => {
            accumulator[tag] = true; 
            return accumulator;
        }, {});

        
        
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('tags', JSON.stringify(tagsObject));
        formData.append('postImg', postImg);
        
        onClose()
        

        let resolvePromise; 
        let rejectPromise; 
    
        const examplePromise = new Promise((resolve, reject) => {
          resolvePromise = resolve
          rejectPromise = reject
        })
    
        toast.promise(examplePromise, {
          success: { title: 'Done', description: "Art uploaded successfully" },
          error: { title: 'Error', description: "Error uploading your Art Try again later" },
          loading: { title: 'Pending', description: 'Uploading your Art' },
        })

        

        await axios.post("art-website-server-production.up.railway.app/posts/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the correct content type
          },
        })
        .then((response) => {
           
          
            if(response.data.message){
              resolvePromise(200)

            }else{
              rejectPromise(401)

            }
            
        })
        .catch((error) => {

          
        })


    }


    




  return (
    <Box>
       <Text color={"white"} fontSize={"32px"} m={"40px"} ml={"68px"}>Your Studio</Text>
       <Box>
          <Box width={"90%"} height={"500px"} borderWidth={"3px"} borderColor={"cyan"} textAlign={"center"} alignContent={"center"} margin={"auto"}>
      
              <input accept='image/*' required type="file" ref={imgInputRef} style={{display: "none"}} onChange={PostFileChange} />
              <Text  color={"white"} fontSize={"28px"} m={"8px"}>This is your studio!</Text>
              <Text fontWeight={"light"} color={"#d3d3d3"} fontSize={"14px"} w={"15%"} m={"auto"} mb={"35px"}>upload an image of your art by clicking on upload image</Text>
              <Button onClick={handleInputClick} colorScheme="blue" >Upload image</Button>
              
              {postImg != null ?
                  <Modal closeOnOverlayClick={false} blockScrollOnMount={false} isOpen={isOpen} onClose={handleClose}>
                  <ModalOverlay />
                  <form onSubmit={handleCreatePost}>
                  <ModalContent >
                    <ModalHeader>Upload your Art</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {imagePreview && (
                        <Box mt={4} >
                          <FormLabel fontSize={"18px"} fontWeight={"bold"}>Image Preview</FormLabel>
                          <Image margin={"auto"} src={imagePreview} alt="Image preview" objectFit={"cover"} />
                        </Box>
                       )}

                        <FormLabel fontSize={"18px"} fontWeight={"bold"} marginTop={"20px"}>Title</FormLabel>
                        <Input focusBorderColor='teal.400' onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter a title"/>

                        <FormLabel fontSize={"18px"} fontWeight={"bold"} marginTop={"20px"}>Tags</FormLabel>
                        <Box  display="flex" alignItems="center" flexDirection="column"  >
                        <Input
                          focusBorderColor='teal.400'
                          value={currentTag}
                          onChange={(e)=>{handleInputChange(e); handleChange(e) }}
                          onKeyDown={(e)=>{handleTagKeyDown(e); handleKeyDown(e)}}
                          placeholder="Type your tags and press space"
                        />
        <List
        color="black"
          
          top="50px" // Adjust based on the height of the search box
          width="400px" // Adjust to match the width of the search box
          bg="teal"
          border="1px solid black"
          borderColor="gray.200"
          borderRadius="4px"
          maxHeight="150px"
          overflowY="auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              padding="8px"
              cursor="pointer"
              _hover={{ bg: 'teal.300' }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      </Box>
                        <Wrap mt={3}>
                          {tags.map((tag) => (
                            <Tag key={tag} colorScheme="teal" size="lg">
                              <TagLabel>{tag}</TagLabel>
                              <TagCloseButton onClick={() => removeTag(tag)} />
                            </Tag>
                          ))}
                        </Wrap> 
                    </ModalBody>
          
                    <ModalFooter>
                      <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button colorScheme='teal' type="submit" isDisabled={isSubmitDisabled}>Submit</Button>
                    </ModalFooter>
                  </ModalContent>
                  </form> 
                </Modal>
            
              :
                null
              }
          </Box>
       </Box>
    </Box>
  )
}
