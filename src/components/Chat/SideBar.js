import React from 'react'
import { useQuery } from '@apollo/client'
import { Box, Typography, Divider, Stack } from '@mui/material'
import ProfileCard from './ProfileCard'
import { GET_ALL_USERS } from '../../graphql/queries'
import { Logout } from '@mui/icons-material'

const SideBar = ({ setLoggedIn }) => {
  
  const { loading, data, error } = useQuery(GET_ALL_USERS)

  if (loading) { 
    return (
      <Box sx={{ height:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h6">Loading chats...</Typography>
      </Box>
    )
  }

  if (error) { 
    console.error(error.message)
  }
  
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
        <Logout onClick={() => { 
          localStorage.removeItem('token') 
          setLoggedIn(false)
        }}
        />
      </Stack>
      <Divider/>
      {
        data.users.map((item, id) => { 
          return <ProfileCard key={item.id} item={item}/>
        })
      }
    </Box>
  )
}

export default SideBar