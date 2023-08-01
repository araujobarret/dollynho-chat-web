<script lang="ts">
	import { Badge } from 'spaper'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let conversation: ConversationType

	let rendered = false
	onMount(() => {
		rendered = true
	})
</script>

{#if rendered}
	<div class="container" transition:fade>
		<a class="paper-btn" href="chats/{conversation.id}">
			<div>
				<img alt="bot avatar" src={conversation.bot.imageSrc} />

				<h5>Chat with {conversation.bot.name}</h5>
			</div>
			<span class="time">
				<h6>
					<Badge type="secondary">
						{new Date(conversation.createdAt).toLocaleString()}
					</Badge>
				</h6>
			</span>
		</a>
	</div>
{/if}

<style>
	.container {
		margin: 0;
		width: 240px;
		height: 140px;
	}

	a {
		display: flex;
		flex-direction: column;
	}

	a div {
		display: flex;
	}

	.time {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}

	h5,
	h6 {
		margin: 0;
	}

	h5 {
		flex: 1;
	}

	img {
		margin-right: 5px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
</style>
