import React from 'react'
import { Stack, Typography } from '@mui/material'

const Welcome = () => {
  return (
    <Stack
        justifyContent='center'
        alignItems='center'
        flexGrow={1}
    >
        <Typography variant="h3">Welcome to Lifly 😎</Typography>
    </Stack>
  )
}

export default Welcome