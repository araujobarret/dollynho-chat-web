<script lang="ts">
	import { Badge } from 'spaper'
	import Bots from './Components/Bots.svelte'
	import { setApolloClient } from '../system/graphql/apollo'
	import Chats from './Components/Chats.svelte'

	setApolloClient()
</script>

<section class="container">
	<h2><Badge type="secondary">Talk to one of our bots</Badge></h2>

	<div class="lists-container"><Bots /></div>

	<h2><Badge type="secondary">Previous Chats</Badge></h2>

	<div class="lists-container"><Chats /></div>
</section>

<style>
	.container {
		background-color: white;
		max-width: none;
		flex-direction: column;
		display: flex;
		overflow: scroll;
	}

	.lists-container {
		background-color: white;
		display: flex;
		gap: 40px;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20px 40px;
	}

	h2 {
		align-self: center;
	}
</style>
