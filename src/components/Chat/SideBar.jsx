import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import ProfileCard from './ProfileCard'

const SideBar = () => {
  const users = [ 
    {
      id:1, name:"Daniel"
    },
    {
      id:2, name:"John"
    }
  ]

  return (
    <Box
      backgroundColor="#F7F7F7"
      height="100vh"
      width="250px"
      padding="10px"
    >
      <Typography variant="h6">Chat</Typography>
      <Divider/>
      {
        users.map((item) => { 
          return <ProfileCard item={item}/>
        })
      }
    </Box>
  )
}

export default SideBar