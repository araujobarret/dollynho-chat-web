<script lang="ts">
	import { Button } from 'spaper'
	import { mutation } from 'svelte-apollo'
	import SpeechRecognition, {
		useSpeechRecognition
	} from 'svelte-speech-recognition/SpeechRecognition'
	import { setApolloClient } from '../../../../system/graphql/apollo'
	import { REPLY_CHAT } from '../../../../graphql/reply.graphql'
	import { CONVERSATION } from '../../../../graphql/conversation.graphql'
	import Recorder from './Recorder.svelte'

	export let chatId: string
	export let onReply: (() => void) | null = null
	const PAGE_SIZE = 100
	let value = ''

	type ChatQuery = {
		conversation: ConversationType
		messagesConnection: MessagesConnectionType
	}

	setApolloClient()

	const reply = mutation(REPLY_CHAT)

	const handleReply = async () => {
		if (value.trim().length > 0) {
			try {
				await reply({
					variables: { input: { conversationId: chatId, body: value } },
					optimisticResponse: false,
					update: (cache, result) => {
						const currentGetConversation = cache.readQuery<ChatQuery>({
							query: CONVERSATION,
							variables: { conversationId: chatId, first: PAGE_SIZE }
						})

						if (currentGetConversation) {
							cache.writeQuery({
								query: CONVERSATION,
								variables: { conversationId: chatId, first: PAGE_SIZE },
								data: {
									...currentGetConversation,
									messagesConnection: {
										...currentGetConversation.messagesConnection,
										// @ts-ignore
										edges: [...currentGetConversation.messagesConnection.edges, result.data.reply]
									}
								}
							})
						}
					}
				})
				value = ''
				onReply?.()
			} catch (e) {
				console.log('error replying to the conversation', e)
			}
		}
		// TODO: check pending mutation before enabling to send again
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && value.length > 0) {
			event.preventDefault()
			handleReply()
		}
	}

	const { transcriptStore, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition()

	transcriptStore.subscribe((t) => {
		value = t.finalTranscript.toString()
	})
</script>

<div class="footer padding-small border border-secondary">
	<div class="footer-elements padding-small">
		<input
			type="textarea"
			class="footer-input border border-secondary"
			bind:value
			on:keyup={handleKeyUp}
		/>
		<Recorder />
		<Button outline="secondary" size="small" on:click={handleReply} disabled={value.length === 0}>
			Send
		</Button>
	</div>
</div>

<style>
	.footer {
		height: auto;
		display: flex;
		flex: 1;
		margin-bottom: 5px;
	}

	.footer-elements {
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: 2vw;
	}

	.footer-input {
		flex: 1;
	}
</style>
