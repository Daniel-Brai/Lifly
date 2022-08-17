import { gql } from '@apollo/client' 

export const SIGNUP_USER = gql`
mutation SignUpUser($newUser: CREATE_USER!) {
    signUpUser(newUser: $newUser) {
      id
      name
      email
    }
  }
`

export const SIGNIN_USER = gql`
mutation SignIn($userSignIn: READ_USER!) {
    signInUser(userSignIn: $userSignIn) {
      token
    }
  }
`

export const SEND_MESSAGE =gql`
mutation CreateMessage($receiverId: Int!, $text: String!) {
  createMessage(receiverId: $receiverId, text: $text) {
    id
    text
    receiverId
    senderId
    createdAt
  }
}
`