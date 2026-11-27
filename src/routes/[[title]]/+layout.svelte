<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { HELP_TEXT } from '#lib/help.js';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import PlusButton from '../../components/PlusButton.svelte';

	let { children, params } = $props();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const title = $derived(params?.title);

	const createItem = async (item: string) => {
		if (browser) {
			window.localStorage.setItem(item, HELP_TEXT);
			items = enumerateItems();
			setTimeout(() => void goto(resolve('/'+item)), 0);

		}
	}

	const enumerateItems = () => {
		if (browser) {
			const ret: string[] = [];
			for (let i = 0; i < window.localStorage.length; i++) {
				ret.push(localStorage.key(i)!);
			}
			return ret;
		}
		return [];
	}

	$effect(() => {
		if (browser) {
			const storedItems = enumerateItems();
			if (storedItems.length === 0) {
				void createItem('default');
			} else if (title === undefined) {
				void goto(resolve('/' + storedItems[0]));
			}
		}
	});

	let items = $derived<string[]>(enumerateItems());



</script>

<svelte:head>
	<title>notesz</title>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
	<link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

<div id="header">
<h1>notesz</h1>
<ul>
	{#each items as item(item)}
		<li class:selected={item === title}>
		{#if item === title}
			{item}
			{:else}
			<a href={resolve('/'+item)} rel="">{item}</a>
			{/if}
		</li>
	{/each}
	<li>
		<PlusButton existingItems={items} onNewItem={createItem}/>
	</li>
</ul>
</div>
{@render children()}

<style>

	div#header {
		width: 100dvw;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		list-style: none;
		padding-right: 0.5em;
		margin: 0;
	}

	li {
		display: inline;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-top: 0.25em;
		padding-bottom: 0.25em;
		border: 3px inset var(--border-color);
		border-radius: 1em;
	}

	li a {
		text-decoration: none;
	}

	li.selected {
		background-color: var(--alternate-background-color);
		font-weight: 800;
	}

	h1 {
		padding-left: 0.25em;
		margin-top: 0;
		margin-bottom: 0;
	}

	:global(body) {
		font-family: "Old Standard TT", serif;
		margin: 0;
		color: var(--text-color);
		background-color: var(--background-color);
		border-color: var(--border-color);

		
	}

	:global(a) {
		color: var(--link-color);
	}

	@media (prefers-color-scheme: dark) {
		:global(html) {
			--text-color: antiquewhite;
			--background-color: #221111;
			--alternate-background-color: #221811;
			--heading-color: aliceblue;
			--shadow-color: azure;
			--border-color: papayawhip;
			--link-color: burlywood;
		}

		div#header {
			background-color: black;
			color: darkkhaki;
		}
	}

	@media (prefers-color-scheme: light) {
		:global(html) {
			--text-color: #221111;
			--background-color: antiquewhite;
			--alternate-background-color: papayawhip;
			--heading-color: #221811;
			--shadow-color: steelblue;
			--border-color: darkgrey;
		}

		div#header {
			background-color: black;
			color: darkkhaki;
		}
	}


</style>
