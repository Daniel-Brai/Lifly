import React from 'react'
import { Box, Typography, Divider, Stack } from '@mui/material'
import ProfileCard from './ProfileCard'
import { Logout } from '@mui/icons-material'

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
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Chat</Typography>
        <Logout />
      </Stack>
      <Divider/>
      {
        users.map((item, id) => { 
          return <ProfileCard key={item.id} item={item}/>
        })
      }
    </Box>
  )
}

export default SideBar