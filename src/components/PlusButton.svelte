<script lang="ts">
    interface Props {
        existingItems: string[];
        onNewItem: (item: string) => unknown;
    }

    type EditMode = 'none' | 'submittable' | 'error';

    let { existingItems, onNewItem }: Props = $props();
    let editMode = $state<EditMode>('none');
    let itemName = $state('');
    let item = $derived(itemName.trim());
    

    $effect(() => {
        const itemValid = (item.length > 0 && !existingItems.includes(item));
        if (editMode !== 'none') {
            editMode =  itemValid ? 'submittable' : 'error';
        }
    });

    let input: HTMLInputElement | undefined = $state<HTMLInputElement>();

    $effect(() => input?.focus());

    const openInput = () => {
        itemName = '';
        editMode = 'error';
    }

    const closeInput = () => {
        itemName = '';
        editMode = 'none';
    }


</script>

<div class="button-container">
{#if editMode !== 'none'}
<form onsubmit={() => {
    onNewItem(item);
    itemName = '';
    editMode = 'none';
}}>
<input onkeyup={e => {
    if (e.key === 'Escape') {
        closeInput();
    }
}} bind:this={input} type="text" bind:value={itemName}/>
<button class="submit" type="submit" disabled={editMode === 'error'}>OK</button>
<button class="submit" type="button" onclick={closeInput}>Cancel</button>
</form>
{:else}
<button class="add" onclick={openInput}><em>New...</em></button>
{/if}
</div>

<style>
    button.add {
        border-radius: 1em;
    }

    div.button-container {
        transition: width 1s ease-in-out;
    }
</style>