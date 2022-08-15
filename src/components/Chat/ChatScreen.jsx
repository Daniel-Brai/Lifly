import { Box, Avatar, Typography, AppBar, Toolbar, TextField } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import MessageCard from './MessageCard'

const ChatScreen = () => {
  const { name } = useParams()

  return (
    <Box
        flexGrow={1}
    >
        <AppBar position='static' sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',backgroundColor: 'white', boxShadow: 1}}>
            <Toolbar>
                <Avatar
                    src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
                    sx={{ width: "32px", height: "32px" }}
                />
            </Toolbar>
            <Typography variant="h6" marginLeft='-16px' color='black'>{name}</Typography>

        </AppBar>

        <Box backgroundColor='#F5f5f5' height="82vh" padding="16px"  sx={{ overflowY: "auto", position: "relative" }}>
            <MessageCard text="Hi John" date="122333" direction="end"/>
            <MessageCard text="Hi John" date="122333" direction="start"/>
        </Box>
        <TextField 
            sx={{marginTop: "16px", position: 'absolute'}}
            placeholder='Enter your message'
            variant='standard'
            fullWidth
            multiline
            rows={2}
        />
    </Box>
  )
}

export default ChatScreen