<script lang="ts">
	import { parseNotes } from '#lib/note-parser.ts';

	import { browser } from '$app/env';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

    const defaultValue = () => {
    if (browser) {
      const item = window.localStorage.getItem('noteText');
        if (item) {
            return item;
        }
        }
        return '';
    }
 

    let note = $state(defaultValue());
    let notes = $derived(parseNotes(note));
    let textarea: HTMLTextAreaElement;


    $effect(() => {
        window.localStorage.setItem('noteText', note);
    });    

    const focusOnNote = (idx: number) => {
        const note = notes[idx];
        const nextNote = notes[idx+1];
        textarea.focus();
        textarea.setSelectionRange(note.start, nextNote.start ?? textarea.value.length);
    }

</script>

<div class="main">
<textarea bind:this={textarea} rows="100" bind:value={note}></textarea>

<div class="articles">
{#each notes as note, idx (idx)}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <article onclick={() => focusOnNote(idx)}>
        {#if note.title}
            <h2>{note.title}</h2>
        {/if}
        {#each note.blocks as block, idx(idx)}
            <section class:with-title={block.title}>
                {#if block.title}
                    <h3>{block.title}</h3>
                {/if}
                {#each block.paras as p, idx(idx)}
                    <p><SvelteMarkdown source={p} isInline /></p>
                {/each}
            </section>
        {/each}
    </article>
{/each}
</div>
</div>

<style>
    div.main {
        display: flex;
        flex-direction: row;
        width: 100dvw;
    }

    textarea {
        width: 50dvw;
        height: 100%;
        font-size: large;
        background-color: var(--alternate-background-color);
        height: 80dvh;
        color: var(--text-color);
    }

    div.articles {
        column-width: 20em;
        padding-left: 1em;
        padding-right: 1em;
        width: 50dvw;
    }

    article {
        border-width: 0.25em;
        border-style: groove;
        border-color: var(--border-color);
        display: inline-block;
        box-shadow: 0.25em 0.25em 0.2em var(--shadow-color);
        border-radius: 0.5em;
        padding: 0.5em;
        width: 20em;
        margin: 0;
        margin-bottom: 1em;
    }

    section + section {
        border-top: 0.10em solid gray;
    }

    section h3 {
        display: inline;
        font-size: normal;
        font-weight: bold;
        margin: 0;
    }

    section.with-title p:first-of-type {
        display: inline;
    }

    section h3::after {
        content: ':'
    }

    p {
        margin: 0;
        margin-bottom: 0.25em;
    }

    h2, h3 {
        text-align: center;
        color: var(--heading-color);
    }
</style>