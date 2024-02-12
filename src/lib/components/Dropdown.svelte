<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let options: { label: string; value: any }[] = [];
	export let currentOption = 'Select an option'
	export let initialLabel: string = currentOption;

	let selectedLabel: string = initialLabel;
	let isOpen: boolean = false;

	const dispatch = createEventDispatcher<{ select: string }>();

	function toggleDropdown(): void {
		isOpen = !isOpen;
	}

	function selectOption(optionLabel: string): void {
		selectedLabel = optionLabel;
		isOpen = false;
		dispatch('select', optionLabel);
	}

	onMount(() => {
		// Optional: Setup tasks when the component mounts
	});
</script>

<div class="w-full dropdown-container relative inline-block text-left">
	<button
		on:click={toggleDropdown}
		type="button"
		class="inline-flex w-full justify-between min-w-40 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		id="menu-button"
		aria-expanded="true"
		aria-haspopup="true"
	>
		{selectedLabel}
		<svg
			class="-mr-1 h-5 w-5 text-gray-400"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	{#if isOpen}
		<div
			class="absolute h-auto right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<ul class="py-1 z-50">
				{#each options as { label, value }}
					<li class="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 z-50">
						<button on:click={() => selectOption(label)} role="menuitem" tabindex="-1" id={label}>
							{label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	/* Your styles here */
</style>
