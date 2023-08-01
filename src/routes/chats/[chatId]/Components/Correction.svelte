<script lang="ts">
	// @ts-ignore
	import { diffChars } from 'diff'
	import { query } from 'svelte-apollo'
	import { CORRECTION, type CorrectionQuery } from '../../../../graphql/correction.graphql'

	export let sentence: string

	const correction = query<CorrectionQuery>(CORRECTION, {
		variables: { sentence }
	})

	let diffSentence: string = ''
	$: if ($correction.data?.correctSentence.correctedPhrase) {
		const diff = diffChars(sentence, $correction.data?.correctSentence.correctedPhrase)
		diff.forEach(({ value, added, removed }: any) => {
			const text = added
				? `<span class="text-success">${value}</span>`
				: removed
				? `<s class="text-danger">${value}</s>`
				: value
			diffSentence += text
		})
	}
</script>

{#if $correction.data}
	{#if $correction.data.correctSentence.correctedPhrase}
		<h4>{@html diffSentence}</h4>
		<p>{$correction.data.correctSentence.description}</p>
	{:else}
		<p>The sentence is correct!</p>
	{/if}
{/if}
