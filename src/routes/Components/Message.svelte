<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import { cubicIn } from 'svelte/easing'
	import { fly } from 'svelte/transition'
	import { Badge, Button } from 'spaper'

	export let message: MessageType
	export let avatar: string | undefined = undefined

	const dispatch = createEventDispatcher()

	let mounted = false
	onMount(() => {
		mounted = true
	})

	const handleHelpClick = () => {
		dispatch('modal', { open: true, selectedText: message.body })
	}
</script>

{#if mounted}
	<div
		class={`container ${message.role === 'user' ? 'container-right' : ''}`}
		in:fly={{ y: 50, easing: cubicIn, duration: 200 }}
	>
		{#if avatar}
			<img alt="avatar" src={`/${avatar}`} />
		{/if}
		<span
			class="padding-small article border message"
			style="--direction: {message.role === 'user' ? 'right' : 'left'}"
			on:select={(a) => console.log(a)}
		>
			<h5>{message.body}</h5>

			<span
				class="text-warning shadow shadow-hover help border border-warning"
				on:click={handleHelpClick}
				role="button"
				tabindex={0}
				on:keypress={(keyEvent) => console.log(keyEvent)}
			>
				<strong>?</strong>
			</span>
		</span>
	</div>
{/if}

<style>
	.container {
		max-width: 50vw;
		min-width: 30vw;
		display: flex;
		margin: 0;
	}

	.container-right {
		align-self: flex-end;
		display: flex;
		justify-content: flex-end;
		text-align: right;
	}

	.message {
		display: flex;
		flex: 1;
		flex-direction: column;
		text-align: var(--direction);
	}

	.message h5 {
		flex: 1;
		margin: 10px 0px;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.help {
		align-items: center;
		align-self: flex-end;
		cursor: pointer;
		display: flex;
		border-radius: 50%;
		height: 15px;
		justify-content: center;
		width: 15px;
		font-size: x-small;
	}
</style>
