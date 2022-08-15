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