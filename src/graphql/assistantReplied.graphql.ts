import { gql } from '@apollo/client/core'

export type AssistantReplied = {
  assistantReplied: MessageType
}

export const ASSISTANT_REPLIED = gql`
  subscription getAssistantReply {
    assistantReplied {
      id
      role
      sequence
      body
    }
  }
`