<script lang="ts">
	export let sentence: string
	const list = [
		{ href: 'https://google.com', title: 'Suggestion 1' },
		{ href: 'https://google.com', title: 'Suggestion 2' },
		{ href: 'https://google.com', title: 'Suggestion 3' }
	]

	let data: Promise<typeof list> = new Promise((resolve) =>
		setTimeout(() => {
			resolve(list)
		}, 2000)
	)
</script>

{#await data}
	<p>loading...</p>
{:then res}
	{#each res as item}
		<p>{item.title}{' - '} <a href={item.href}>link</a></p>
	{/each}
{/await}
