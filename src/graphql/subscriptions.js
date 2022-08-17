import { gql } from '@apollo/client'

export const MESSAGE_SUBS = gql`
subscription MessageAdded {
    messageAdded {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`