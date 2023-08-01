<script lang="ts">
	import { Badge } from 'spaper'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let bot: BotType

	let rendered = false
	onMount(() => {
		rendered = true
	})
</script>

{#if rendered}
	<div class="container" transition:fade>
		<a class="paper-btn" href="/{bot.id}">
			<img alt={`Bot ${bot.name} Avatar`} src={bot.imageSrc} />
			<h4>
				<Badge type="secondary">{bot.name}</Badge>
			</h4>
			<h5>{bot.description}</h5>
		</a>
	</div>
{/if}

<style>
	.container {
		margin: 0;
		width: 200px;
		height: 240px;
	}

	a {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}

	h4,
	h5 {
		margin: 10px;
	}

	img {
		align-self: center;
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}
</style>
