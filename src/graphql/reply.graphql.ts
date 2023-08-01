import { gql } from '@apollo/client/core'

export const REPLY_CHAT = gql`
  mutation reply($input: ReplyInput!) {
    reply(input: $input) {
      id
      role
      sequence
      body
    }
  }
`