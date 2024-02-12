<script lang="ts">
	import { onMount } from 'svelte';
	import { useForm } from 'svelte-use-form';
	import { expenses, loadExpense, selectedExpenseId } from '$lib/stores/ExpenseStore';
	import ExpenseRow from '$lib/components/ExpenseRow.svelte';
	import CreateExpenseForm from '$lib/components/CreateExpenseForm.svelte';
	import type { ExpenseType } from '../../../global';
	import EditExpenseForm from '$lib/components/EditExpenseForm.svelte';

	type ElementEvent<T extends Element> = Event & { currentTarget: T };

	import { compareDesc } from 'date-fns/compareDesc';
	const dropdownOptions = [
		{ label: 'All', value: 0 },
		{ label: 'Groseries', value: 1 },
		{ label: 'Car', value: 2 },
		{ label: 'Rent', value: 3 },
		{ label: 'Clothes', value: 4 },
		{ label: 'Appliances', value: 5 }
		// Add more options as needed
	];

	$: expensesToDisplay = [...$expenses].sort((a, b) => compareDesc(a.created_at, b.created_at));

	const form = useForm();

	let selectedFilterLabel: string = 'All';
	let searchQuery: string = '';

	onMount(async () => {
		await loadExpense();
		filterExpenses();
	});

	function handleSelect(event: ElementEvent<HTMLSelectElement>): void {
		if (event.target) {
			selectedFilterLabel = event.target.value;
			filterExpenses();
		}
	}

	function handleSearch(event: ElementEvent<HTMLInputElement>): void {
		if (event.target) {
			searchQuery = event.target.value;
			filterExpenses();
		}
	}

	function filterByQuery(expArr: ExpenseType[]): ExpenseType[] {
		return expArr.filter((item) =>
			item.expense_name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	function filterByCategory(expArr: ExpenseType[]): ExpenseType[] {
		if (selectedFilterLabel === dropdownOptions[0].label) {
			return [...expArr];
		}
		return expArr.filter((item) => item.expense_category === selectedFilterLabel);
	}

	function filterExpenses(): void {
		console.log('Filter', expensesToDisplay);
		const categorizes = filterByCategory($expenses);
		expensesToDisplay = filterByQuery(categorizes);
	}
</script>

<body class="antialiased font-sans">
	<h1 class="text-3xl font-bold">Expenses</h1>
	<div class="container mx-auto">
		<div class="py-8">
			<div class="my-2 flex sm:flex-row flex-col">
				<div class="flex flex-row mb-1 sm:mb-0">
					<div class="relative">
						<select
							class="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							on:change={handleSelect}
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
							on:change={handleSelect}
						>
							{#each dropdownOptions as option}
								<option>{option.label}</option>
							{/each}
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
						on:change={handleSearch}
						class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
					/>
				</div>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
				<div class="inline-block min-w-full shadow rounded-lg">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-9 py-3 min-w-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Id
								</th>
								<th
									class="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Name
								</th>
								<th
									class="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Category
								</th>
								<th
									class="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Value
								</th>
								<th
									class="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Date
								</th>
								<th
									class="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
							<CreateExpenseForm />
							{#each expensesToDisplay as item}
								{#if item.id === $selectedExpenseId}
									<EditExpenseForm newExpense={item} />
								{:else}
									<ExpenseRow currentExpense={item} />
								{/if}
							{/each}
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
