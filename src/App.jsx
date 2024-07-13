import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.scss'
import MainLayout from './layouts/mainLayout'
import Home from './layouts/home/Home'
import Sign from './layouts/sign/Sign'
import SignUp from './components/signUp/SignUp'
import Login from './components/login/Login'
import Profile from './components/profile/profile'
import Post from './components/post/Post'
import Search from './components/search/search'
import PlaylistProfile from './components/playlistProfile/PlaylistProfile'

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Sign />} path='/sign'>
            <Route element={<Login />} index />
            <Route element={<SignUp />} path='signUp' />

         </Route>

          <Route element={<MainLayout />} path='/'>
              <Route element={<Home />} path='/' />
              <Route element={<Profile />} path="/profile/:username" />
              <Route element={<Post />} path="/post" />
              <Route element={<PlaylistProfile />} path='/playlist/:title'/>
              <Route element={<Search />} path='/Search/:list' />
              
          </Route>

         
          
      </Routes>


    </BrowserRouter>
  )
}

export default App
