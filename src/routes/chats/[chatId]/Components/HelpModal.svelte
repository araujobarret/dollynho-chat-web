<script lang="ts">
	import { Radio } from 'spaper'
	import Correction from './Correction.svelte'

	export let selectedText: string
	export let selectedOption = ''

	console.log('selectedOption', selectedOption)
</script>

<div class="container padding-top">
	<fieldset class="form-group">
		<Radio label="Correction" value="correction" bind:group={selectedOption} />
	</fieldset>

	{#if selectedOption === 'correction'}
		<Correction sentence={selectedText} />
	{/if}
</div>

<style>
	.container {
		margin: 0;
		min-height: 240px;
		min-width: 300px;
		transition: all 200ms ease-in;
	}
</style>
