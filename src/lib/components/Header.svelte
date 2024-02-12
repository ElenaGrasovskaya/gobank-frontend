<script>
	import '../../app.css';
	import { page } from '$app/stores';
	import { user } from '../stores/UserStore';
	import { logout } from '$lib/service/logout';
</script>

<header class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
	<div class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
		<nav class="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
			<a
				href="/"
				class="px-4 py-2 text-xs font-bold text-gray-900 uppercase mr-5 hover:bg-blue-300 transition-all rounded"
				class:active={$page.url.pathname === '/'}>Home</a
			>
			{#if $user.id !== 0}
				<a
					href="/expenses"
					class="px-4 py-2 text-xs font-bold text-gray-900 uppercase mr-5 hover:bg-blue-300 transition-all rounded"
					class:active={$page.url.pathname === '/invoices'}>Expenses</a
				>
			{:else}
				<div></div>
			{/if}
		</nav>
		<a
			class="flex items-center sansSerif order-first mb-4 font-medium text-gray-900 text-lg lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0"
			href="/"
		>
			GoBank
		</a>
		{#if $user.id !== 0}
			<div class="inline-flex items-center h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
				<p class="mr-5 px-4 py-2 text-xs font-bold text-blue-900 uppercase rounded">
					Hi {$user.first_name}
				</p>
				<a
					href="/"
					on:click={logout}
					class="px-4 py-2 text-xs font-bold text-gray-900 uppercase transition-all duration-150 focus:outline-none hover:bg-blue-300 rounded"
				>
					Sign Out
				</a>
			</div>
		{:else}
			<div class="inline-flex items-center h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
				<a
					href="/login"
					class="mr-5 px-4 py-2 text-xs font-bold text-gray-900 uppercase hover:bg-blue-300 transition-all rounded"
					class:active={$page.url.pathname === '/login'}>Login</a
				>
				<a
					href="/signup"
					class="px-4 py-2 text-xs font-bold text-gray-900 uppercase transition-all duration-150 focus:outline-none hover:bg-blue-300 rounded"
					class:active={$page.url.pathname === '/signup'}
				>
					Sign Up
				</a>
			</div>
		{/if}
	</div>
</header>

<style lang="postcss">
	a.active {
		@apply px-4 py-2 text-xs font-bold text-white uppercase bg-teal-400 rounded shadow outline-none hover:shadow-md focus:outline-none;
	}

	a.active:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(147 197 253 / var(--tw-bg-opacity));
	}
</style>
