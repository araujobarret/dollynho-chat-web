<script lang="ts">
	import { gql } from '@apollo/client/core'
	import { query } from 'svelte-apollo'
	import { setApolloClient } from '../../system/graphql/apollo'
	import Chat from './Chat.svelte'

	setApolloClient()

	const CHATS = gql`
		query Conversations($userId: ID!, $first: Int) {
			conversationsConnection(userId: $userId, first: $first) {
				edges {
					id
					bot {
						name
						imageSrc
					}
					createdAt
				}
			}
		}
	`
	const conversations = query<{ conversationsConnection: ConversationsConnectionType }>(CHATS, {
		variables: { userId: '2wDaISKYiWjOSVBtNftO', first: 10 }
	})
</script>

{#if !!$conversations.data?.conversationsConnection.edges.length}
	{#each $conversations.data.conversationsConnection.edges as conversation}
		<Chat {conversation} />
	{/each}
{/if}
