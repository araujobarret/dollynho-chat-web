import { gql } from '@apollo/client/core'

export const CONVERSATION = gql`
  query conversationQuery ($conversationId: ID!, $first: Int!) {
    conversation(conversationId: $conversationId) {
      bot {
        name
        imageSrc
      }
    }
    messagesConnection(conversationId: $conversationId, first: $first) {
      edges {
        id
        role
        sequence
        body
      }
    }
  }
`