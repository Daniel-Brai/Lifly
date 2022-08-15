import React from 'react'
import { Stack, Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProfileCard = ({ item: { id, name } }) => {
  const navigate = useNavigate()

  const userChat = () => { 
    return navigate(`/users/${id}/${name}`)
  }

  return (
    <Stack
      className='profile__card'
      direction="row"
      spacing={2}
      sx={{py: 1, px: 2, display: 'flex', alignItems: 'center'}}
      onClick={userChat}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
        sx={{ width: "32px", height: "32px" }}
      />
      <Typography
        variant='subtitle2'
      >
        { name }
      </Typography>
    </Stack>
  )
}

export default ProfileCard