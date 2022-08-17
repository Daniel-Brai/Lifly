import React from 'react'
import { Box } from '@mui/material'
import SideBar from '../../components/Chat/SideBar'
import Welcome from '../../components/Chat/Welcome'
import { Routes, Route } from 'react-router-dom'
import ChatScreen from '../../components/Chat/ChatScreen'

const Home = ({ setLoggedIn }) => {
  return (
    <Box
      display='flex'
    >
        <SideBar setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path= '/' element={<Welcome />} />
          <Route path= '/users/:id/:name' element={<ChatScreen />} />
        </Routes>
    </Box>
  )
}

export default Home