import React, { useState, useRef } from 'react'
import { Box, Card, Stack, Typography, Button, TextField } from '@mui/material'

const SignUp = () => {
    const [ login, setLogin ] = useState(true)
    const [ formData, setFormData ] = useState({})
    const authForm = useRef(null)

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

  return (
    <Box
        ref={ authForm }
        component="form"
        onSubmit= { handleSubmit }
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
    >
        <Card sx={{padding: "20px", width: "75%", border: "none"}}>
            <Stack 
                direction="column"
                spacing={2}
                sx={{ }}
            >
                <Typography variant="h4" sx={{marginBottom: "8px"}}>
                    Welcome to Lifly
                </Typography>
                {
                    !login && 
                    <TextField 
                        name="name"
                        label="Your name"
                        variant="outlined"
                        onChange={ handleChange }
                   />
                }
                <TextField 
                    name="email"
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    onChange={ handleChange }
                />
                <TextField 
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={ handleChange }
                />
                <Button variant="outlined" type="submit">
                    {
                        login? "Sign In" : "Create an account"
                    }
                </Button>
                <Typography 
                    variant="subtitle2" 
                    sx={{marginTop: "10px", cursor: "pointer"}} 
                    onClick={()=>{
                        setLogin((preValue)=>!preValue)
                        setFormData({})
                        authForm.current.reset()
                    }}
                >
                    {
                        login? 
                            <p>Don't have an account? 
                                <span style={{color: "#0071FF", marginLeft: "4px"}}>Sign Up</span> 
                            </p>: 
                            <p>Already have an account? 
                                <span style={{color: "#0071FF", marginLeft: "4px"}}>Sign In</span> 
                            </p> 
                        
                                
                                
                    }
                </Typography>
            </Stack>
        </Card>
    </Box>
  )
}

export default SignUp