<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>notesz</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>notesz</h1>
{@render children()}

<style>
	h1 {
		width: 100dvw;
		margin-top: 0;
		padding-left: 0.25em;
	}

	:global(body) {
		margin: 0;
		color: var(--text-color);
		background-color: var(--background-color);
		border-color: var(--border-color);
	}

	@media (prefers-color-scheme: dark) {
		:global(html) {
			--text-color: antiquewhite;
			--background-color: #221111;
			--alternate-background-color: #221811;
			--heading-color: aliceblue;
			--shadow-color: azure;
			--border-color: papayawhip;
		}

		h1 {
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

		h1 {
			background-color: black;
			color: darkkhaki;
		}
	}


</style>
