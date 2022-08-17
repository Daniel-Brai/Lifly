import React, { useState, useRef } from 'react'
import { Box, Alert, Card, Stack, Typography, Button, TextField, CircularProgress } from '@mui/material'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER, SIGNIN_USER } from '../../graphql/mutations'

const AuthForm = ({ setLoggedIn }) => {
    const [ login, setLogin ] = useState(true)
    const [ formData, setFormData ] = useState({})
    const authForm = useRef(null)
    const [signupUser, { data: signupData, loading:l1, error: e1 }] = useMutation(SIGNUP_USER)
    const [signinUser, { data: signinData, loading:l2, error: e2 }] = useMutation(SIGNIN_USER, {
        onCompleted(data) { 
            localStorage.setItem('token', data.signInUser.token)
            setLoggedIn(true)
        }
    })

    if (l1 || l2) {
        return (
            <Box textAlign="center" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
                <Typography variant="h6">Authenticating....</Typography>
            </Box>
        )
    }

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
        if (login) {
            signinUser({
                variables: {
                    userSignIn: formData
                }
            })
        } else {
            signupUser({
                variables: {
                    newUser: formData
                }
            })
        }
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
                {
                    signupData && <Alert severity='success'>Sign up Successful!</Alert>
                }
                {
                    e1 && <Alert severity='error'>{e1.message}</Alert>
                }

                {
                    signinData && <Alert severity='success'>Sign in Successful!</Alert>
                }
                {
                    e2 && <Alert severity='error'>{e2.message}</Alert>
                }

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
                        required
                   />
                }
                <TextField 
                    name="email"
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    onChange={ handleChange }
                    required
                />
                <TextField 
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={ handleChange }
                    required
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

export default AuthForm