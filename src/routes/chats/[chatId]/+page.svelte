<script lang="ts">
	import { tick } from 'svelte'
	import { query, subscribe } from 'svelte-apollo'
	import { Modal } from 'spaper'
	import Reply from './Components/Reply.svelte'
	import HelpModal from './Components/HelpModal.svelte'
	import { CONVERSATION } from '../../../graphql/conversation.graphql'
	import {
		ASSISTANT_REPLIED,
		type AssistantReplied
	} from '../../../graphql/assistantReplied.graphql'
	import { setApolloClient } from '../../../system/graphql/apollo'
	import Message from '../../Components/Message.svelte'
	import Back from '$lib/Components/Back.svelte'

	export let data
	let scrollDiv: HTMLDivElement
	const PAGE_SIZE = 100
	let isModalOpen = false
	let selectedText = ''
	let selectedOption = ''

	type ChatQuery = {
		conversation: ConversationType
		messagesConnection: MessagesConnectionType
	}

	setApolloClient()

	const chat = query<ChatQuery>(CONVERSATION, {
		variables: {
			conversationId: data.chatId,
			first: PAGE_SIZE
		}
	})

	const scrollToBottom = () => {
		scrollDiv?.scroll({ top: scrollDiv.scrollHeight, behavior: 'smooth' })
	}

	$: if ($chat.data?.messagesConnection?.edges && scrollDiv) {
		tick().then(scrollToBottom)
	}

	const botReply = subscribe<AssistantReplied>(ASSISTANT_REPLIED)

	$: messagesData = $chat.data?.messagesConnection.edges ?? []
	let subscriptionReplies: MessageType[] = []
	let messages: MessageType[] = []

	$: if ($chat.data?.messagesConnection.edges || $botReply.data) {
		messages = [...messagesData, ...subscriptionReplies].sort((a, b) => {
			if (a.sequence > b.sequence) {
				return 1
			}
			return -1
		})
	}

	$: if (!isModalOpen && selectedOption !== '') {
		selectedOption = ''
	}

	$: if ($botReply.data) {
		subscriptionReplies = [...subscriptionReplies, $botReply.data.assistantReplied]
		tick().then(scrollToBottom)
	}

	// Errors
	$: if ($botReply.error) {
		console.error('subscription error', $botReply.error)
	}
	$: if ($chat.error) {
		console.error('chat error', $chat.error)
	}

	const handleModalOpen = (event: CustomEvent<any>) => {
		isModalOpen = !!event.detail.open
		selectedText = event.detail.selectedText ?? ''
	}
</script>

{#if $chat.data}
	<div class="container padding-bottom-large" bind:this={scrollDiv}>
		<Modal bind:active={isModalOpen} title="More Information">
			<HelpModal {selectedText} bind:selectedOption />
		</Modal>

		<div class="header border">
			<Back />
			<div>
				<img
					alt={`${$chat.data.conversation.bot.name} avatar`}
					src={`/${$chat.data.conversation.bot.imageSrc}`}
				/>
			</div>
			<h3>Your chat with {$chat.data.conversation.bot.name}</h3>
		</div>

		{#if messages.length > 0}
			<div class="messages-container">
				{#each messages as message (message.id)}
					<Message
						on:modal={handleModalOpen}
						{message}
						avatar={message.role === 'assistant' ? $chat.data.conversation.bot.imageSrc : undefined}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<Reply chatId={data.chatId} onReply={scrollToBottom} />
{/if}

<style>
	.container {
		height: 100vh;
		overflow: scroll;
		max-width: inherit;
		margin: 0;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		position: sticky;
		z-index: 1;
		top: 0;
		background-color: white;
		margin-bottom: 20px;
	}

	.header img {
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}

	.header h3 {
		margin: 0;
	}

	.messages-container {
		display: flex;
		gap: 20px;
		flex-direction: column;
	}
</style>
