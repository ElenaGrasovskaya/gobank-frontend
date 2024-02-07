<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let initialLabel = 'Options';
	let selectedLabel = initialLabel;
	let isOpen = false;

	const dispatch = createEventDispatcher();
	// Function to toggle dropdown open state
	function toggleDropdown() {
		isOpen = !isOpen;
	}
	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown-container')) {
			isOpen = false;
		}
		selectedLabel = label;
		isOpen = false; // Optionally close the dropdown upon selection
		dispatch('select', { label }); // Dispatch an event with the selected label
	}

	// Optional: Close the dropdown when clicking outside of it
	function selectOption(label) {
		selectedLabel = label;
		isOpen = false; // Optionally close the dropdown upon selection
	}
	// Listen for clicks outside the dropdown
	onMount(() => {
		window.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="dropdown-container relative inline-block text-left">
	<button on:click|stopPropagation={toggleDropdown} class="...">
		{selectedLabel}
		<!-- Icon indicating dropdown -->
		<svg
			class="ml-2 -mr-1 h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div class="py-1" role="none">
				<a
					href="#"
					on:click|preventDefault={() => selectOption('Account settings')}
					class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					role="menuitem">Account settings</a
				>
				<a
					href="#"
					on:click|preventDefault={() => selectOption('Support')}
					class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					role="menuitem">Support</a
				>
				<a
					href="#"
					on:click|preventDefault={() => selectOption('License')}
					class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					role="menuitem">License</a
				>
				<form method="POST" action="#" role="none">
					<button
						type="submit"
						on:click|preventDefault={() => selectOption('Sign out')}
						class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						role="menuitem">Sign out</button
					>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Custom styles for the dropdown */
</style>
