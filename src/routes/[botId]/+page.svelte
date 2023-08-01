<script lang="ts">
  import { onMount } from 'svelte'
	import { mutation } from 'svelte-apollo'
  import { setApolloClient } from "../../system/graphql/apollo"
	import { gql } from '@apollo/client/core'
	import { goto } from '$app/navigation';

  export let data

  type ConversationMutation = { startNewConversation: ConversationType }

  setApolloClient()

  const CREATE_CONVERSATION = gql(`
    mutation createConversation ($input: StartConversationInput!) {
      startNewConversation(input: $input) {
        id
        bot {
          name
          level
        }
        messages {
          id
          role
          body
        }
      }
    }
  `)

  const createConversation = mutation<ConversationMutation, any>(CREATE_CONVERSATION)

  const handleError = (e: any) => {
    console.error("Error starting a new conversation", e)
    goto("/")
  }
  
  onMount(() => {
    createConversation({ variables: { input: { botId: data.botId } } })
      .then(data => {
        if (data.data) {
          goto(`/chats/${data.data?.startNewConversation.id}`)
          return
        }
        if (data.errors) { handleError(data.errors) }
      })
      .catch(handleError)
  })

</script>
