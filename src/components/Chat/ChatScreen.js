import { Box, Avatar, Typography, AppBar, Toolbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import MessageCard from './MessageCard'
import { GET_USER_MESSAGES } from '../../graphql/queries'
import { SEND_MESSAGE } from '../../graphql/mutations'
import SendIcon from '@mui/icons-material/Send'
import { MESSAGE_SUBS } from '../../graphql/subscriptions'

const ChatScreen = () => {
  const { id, name } = useParams()
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const { data, loading, error } = useQuery(GET_USER_MESSAGES, {
    variables: { 
        receiverId: Number(id)
    },
    onCompleted(data) {
        setMessages(data.messagesByUser)
    }
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // onCompleted(data) { 
    //     setMessages((prevMsgs) => [...prevMsgs, data.createMessage])
    // }
  })

  const { data: subData } = useSubscription(MESSAGE_SUBS, {
    onSubscriptionData({ subscriptionData: { data } }) {
        // console.log(data)
        setMessages((prevMsgs) => [...prevMsgs, data.messageAdded])

    }
  })

  const dateFormater = (date) => {
    const _Date = new Date(date)
    return _Date.toLocaleTimeString()
  }

  if (error) {
    console.log(error.message)
  }

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
            { loading? 
                <Typography>Loading chats...</Typography>: 
                messages.map(msg => {
                    return <MessageCard key={msg.createdAt} text={msg.text} date={dateFormater(msg.createdAt)} direction={ msg.receiverId === Number(id) ? "end" : "start" } />
                })
            }
        </Box>
        <Box 
           sx={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent:"space-between"}} 
        >
            <TextField 
                sx={{marginTop: "16px", position: 'relative', padding: '8px'}}
                placeholder='Enter your message'
                variant='standard'
                fullWidth
                multiline
                rows={2}
                value={text}
                onChange={e=>setText(e.target.value)}
            />
            <SendIcon sx={{ cursor: 'pointer', marginRight: '10px' }} fontSize="large" onClick={
                () => { 
                    sendMessage({
                        variables: {
                            receiverId: Number(id), 
                            text: text
                        }
                    })
                    
                }}
            />
        </Box>
    </Box>
  )
}

export default ChatScreen