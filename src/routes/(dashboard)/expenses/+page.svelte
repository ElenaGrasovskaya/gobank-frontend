<script lang="ts">
	import { onMount } from 'svelte';
	import { useForm } from 'svelte-use-form';
	import { writable } from 'svelte/store';
	import Dropdown from '$lib/components/Dropdown.svelte';

	const form = useForm();

	type ExpenseType = {
		createdAt: string;
		expense_name: string;
		expense_purpose: string;
		expense_category: string;
		expense_value: number;
		id: number;
		user_id: number;
	};

	let newExpense = {
		expense_name: '',
		expense_value: 0,
		expense_category: '',
		expense_purpose: ''
	};

	let selectedOption = 'Options';

	function handleSelect(event) {
		selectedOption = event.detail.label;
		newExpense.expense_category = selectedOption;
		console.log('Selected option:', selectedOption);
	}

	export const expenses = writable<ExpenseType[]>([]);

	async function fetchData() {
		const response = await fetch('https://gobank-api.onrender.com/expense', {
			method: 'GET',
			credentials: 'include'
		});
		const newData = await response.json();

		if (JSON.stringify(newData) !== JSON.stringify($expenses)) {
			$expenses = newData;
		}
	}

	onMount(fetchData);
	async function createNewExpense() {
		try {
			console.log('Starting creating new expense with ', newExpense);
			const response = await fetch('https://gobank-api.onrender.com/expense', {
				method: 'POST', // Specify the method
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newExpense)
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error('Error registering user:', error);
		}
	}
</script>

<body class="antialiased font-sans">
	<h1 class="text-3xl font-bold">Invoices</h1>
	<div class="container mx-auto">
		<div class="py-8">
			<div>
				<h2 class="text-2xl font-semibold leading-tight">Users</h2>
			</div>
			<div class="my-2 flex sm:flex-row flex-col">
				<div class="flex flex-row mb-1 sm:mb-0">
					<div class="relative">
						<select
							class="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						>
							<option>5</option>
							<option>10</option>
							<option>20</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
						>
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/>
							</svg>
						</div>
					</div>
					<div class="relative">
						<select
							class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
						>
							<option>All</option>
							<option>Active</option>
							<option>Inactive</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
						>
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div class="block relative">
					<span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
						<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
							<path
								d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
							>
							</path>
						</svg>
					</span>
					<input
						placeholder="Search"
						class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
					/>
				</div>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Id
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Name
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Category
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Value
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Date
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Description
								</th>

								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{#each $expenses as item}
								<tr>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<div class="flex items-center">
											<div class="ml-3">
												<p class="text-gray-900 whitespace-no-wrap">
													{item.id}
												</p>
											</div>
										</div>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap px-4">{item.expense_name}</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap px-4">{item.expense_category}</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap px-4">
											{item.expense_value}
										</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap px-4">
											{new Date(item.createdAt).toLocaleDateString()}
										</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap px-4">
											{item.expense_purpose}
										</p>
									</td>

									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<button
											type="submit"
											class=" bg-blue-300 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
											on:click|preventDefault={createNewExpense}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="edit"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button
										>

										<button
											type="submit"
											class=" bg-red-300 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
											on:click|preventDefault={createNewExpense}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete"><path fill="#000" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"></path><path fill="#000" fill-rule="evenodd" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z" clip-rule="evenodd"></path></svg></button
										>
									</td>
								</tr>
							{/each}

							<tr>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div class="flex items-center"></div>
								</td>

								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<input
										class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
										type="text"
										name="expense_name"
										id="expense_name"
										placeholder="Expense name"
										bind:value={newExpense.expense_name}
									/>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<Dropdown initialLabel="Select an Option" on:select={handleSelect} />
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<input
										class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
										type="number"
										name="expense_value"
										id="expense_value"
										placeholder="Expense value"
										bind:value={newExpense.expense_value}
									/>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<input
										class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
										type="date"
										name="expense_date"
										id="expense_date"
										placeholder={new Date().toLocaleDateString()}
									/>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<input
										class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
										type="text"
										name="expense_purpose"
										id="expense_purpose"
										placeholder="Expense description"
										bind:value={newExpense.expense_purpose}
									/>
								</td>

								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div class="flex items-center">
										<button
											type="submit"
											class="bg-teal-500 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
											on:click|preventDefault={createNewExpense}><svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" id="create"><path d="M0 0v16h16V0H0zm12 9H9v3H7V9H4V7h3V4h2v3h3v2z"></path></svg></button
										>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
					>
						<span class="text-xs xs:text-sm text-gray-900"> Showing 1 to 4 of 50 Entries </span>
						<div class="inline-flex mt-2 xs:mt-0">
							<button
								class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
							>
								Prev
							</button>
							<button
								class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
