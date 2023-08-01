<script lang="ts">
	import { gql } from '@apollo/client/core'
	import { query } from 'svelte-apollo'
	import Bot from './Bot.svelte'

	const BOTS = gql`
		query Bots {
			bots {
				id
				name
				level
				subject
				description
				imageSrc
			}
		}
	`
	const bots = query<{ bots: BotType[] }>(BOTS)
</script>

{#if $bots.data}
	{#each $bots.data.bots as bot (bot.id)}
		<Bot {bot} />
	{/each}
{/if}
