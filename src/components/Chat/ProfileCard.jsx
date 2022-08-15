import React from 'react'
import { Stack } from '@mui/material'

const ProfileCard = ({ item: { id, name } }) => {
  return (
    <div>{ name }</div>
  )
}

export default ProfileCard