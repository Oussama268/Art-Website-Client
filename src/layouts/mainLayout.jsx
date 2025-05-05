import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { useState } from 'react';
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import './mainLayout.scss'
import { Box, Popover, PopoverContent, PopoverTrigger, Input, flexbox, ListItem, List, Tag, TagCloseButton, Wrap, TagLabel, Icon} from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode';
import { useUserId } from '../config/UserIdcontext';
import { color } from 'framer-motion';
export default function MainLayout() {    
    
 

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [newWidth, setNewWidth] = useState(0);
  const [newOpacity, setNewOpacity] = useState(0);
  const [stop, setStop] = useState(0);
  const [tags, setTags] = useState([]);



  const inputRef = useRef(null);
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = tags.filter((suggestion) =>
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
      setSelectedTerms([...selectedTerms, suggestion]);
      inputRef.current.focus();
     
    }
    setSearchTerm('');
    setFilteredSuggestions([]);
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTerms(selectedTerms.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    axios.get(`https://art-website-server-production.up.railway.app/tags/`)
        .then((result) => {
            
            setTags( Object.keys(result.data));
        })
        .catch((error) => {
            console.error('Error fetching tags:', error);
        });
        
        
}, []);










    const navigate = useNavigate()
    const {userId} = useUserId()

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        
      };

    const handleUser = () => {

        if(!localStorage.getItem('authToken')){
                
            navigate("/sign")

        }else{
            axios.get(`https://art-website-server-production.up.railway.app/users/${userId}`)
            .then( (response) => {

              
                navigate(`/profile/${response.data.username}`)
                

            }
            )
            
        }


    }

        let arrow = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        let SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        let add = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        let account = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        let login=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
        let signup=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>

        return(
            <>
        <header>

            <nav id='NavBar'>

                {/* Arrow */}
                <Link to={"/"}>
                    <div id='arrow'>
                        {arrow}
                    </div>
                </Link>



  {/* Search */}   

  <Box  display="flex" alignItems="center" onMouseEnter={() => { setNewOpacity(1); setNewWidth('100%'); }}
      onMouseLeave={() => { if (stop === 0) { setNewOpacity(0); setNewWidth(0); } }} >
      <Box 
        position="relative"
        width={newWidth}
        opacity={newOpacity}
        overflow="hidden"
        transition="width 0.3s ease, opacity 0.3s ease"
        display="flex"
        alignItems="center"
        padding="4px"
        borderRadius="4px"
        border="1px solid"
        borderColor="gray.300"
        backgroundColor="rgba(0, 0, 0, 0.9)"
        _focusWithin={{ borderColor: 'teal' }}
      >
        {selectedTerms.map((term, index) => (
          <Tag
            key={index}
            size="sm"
            borderRadius="full"
            variant="solid"
            colorScheme="teal"
            marginRight="4px"
            marginBottom="4px"
          >
            <TagLabel>{term}</TagLabel>
            <TagCloseButton onClick={() => handleTagRemove(term)} />
          </Tag>
        ))}
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { setNewOpacity(1); setNewWidth("100%"); setStop(1); }}
          onBlur={() => {{ setNewOpacity(0); setNewWidth(0);setStop(0) } }}
          width="auto"
          flex="1"
          minWidth="80px"
          border="none"
          _focus={{ boxShadow: 'none' }}
          height="30px"
          ref={inputRef}
          color="teal"
          backgroundColor="rgba(0, 0, 0, 0.9)"
        />
      </Box>
      <Box
        w={5}
        h={5}
        ml="10px"
        cursor="pointer"
        _hover={{ color: "teal" }}
        onMouseEnter={() => { setNewOpacity(1); setNewWidth('100%'); }}
      >
        {SearchIcon}
      </Box>
      {filteredSuggestions.length > 0 && (
        <List
        opacity={newOpacity}
        color="black"
          position="absolute"
          top="50px" // Adjust based on the height of the search box
          width="400px" // Adjust to match the width of the search box
          bg="teal"
          border="1px solid black"
          borderColor="gray.200"
          borderRadius="4px"
          zIndex="1"
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
      )}
    </Box>



                    
                        
                    
                    

                {/* Logo */}
                    <div className='logo'>
                       
                    </div>

                {/* Add */}
                {
                    localStorage.getItem('authToken')  &&
                    <Link to={"/post"}> 
                    <div id='add'>

                        {add}

                    </div>
                    </Link>
                }
                

                {/* Account */}
                    <div id='account' onClick={handleUser}> 

                        {account}

                        <div id='drop-down'>

                            <hr className='line'/>

                            <div className='items'>
                            <NavLink to="/sign">
                                <div className='item' onClick={handleLogout}>

                                    {login}

                                </div>
                            </NavLink>
                            {
                                !localStorage.getItem('authToken') ?

                                
                            <NavLink to="/sign/signUp">
                                
                                <div className='item'>

                                    {signup}

                                </div>
                            </NavLink> : null
                            }
                            </div>
                            
                        </div>
                    </div>

            </nav>
            
        </header>

        <main>
            
            <Outlet />
            
        </main>
        </>
    ) 
}
