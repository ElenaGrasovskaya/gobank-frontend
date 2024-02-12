<script lang="ts">
	import { loadExpense, expenses, selectedExpenseId } from '$lib/stores/ExpenseStore';
	import type { ExpenseType } from '../../global';
	import { API_URL } from "../service/constants";
	import Dropdown from './Dropdown.svelte';

	const selectedExpense = $expenses.find((exp) => exp.id === $selectedExpenseId);
	export let newExpense = {
		id: selectedExpense?.id,
		user_id: selectedExpense?.user_id,
		expense_name: selectedExpense?.expense_name,
		expense_purpose: selectedExpense?.expense_purpose,
		expense_category: selectedExpense?.expense_category,
		expense_value: selectedExpense?.expense_value,
		created_at: selectedExpense?.created_at,
		updated_at: selectedExpense?.updated_at
	};

	async function editExpense() {
		try {
			console.log('Starting editing', selectedExpense);
			const response = await fetch(`${API_URL}/expense/${$selectedExpenseId}`, {
				method: 'POST', // Specify the method
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(selectedExpense)
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.json();
			$selectedExpenseId = 0;
			console.log(result);
		} catch (error) {
			console.error('Error registering user:', error);
		}

		loadExpense();
	}

	const dropdownOptions = [
		{ label: 'Groseries', value: 1 },
		{ label: 'Car', value: 2 },
		{ label: 'Rent', value: 3 },
		{ label: 'Clothes', value: 3 },
		{ label: 'Appliances', value: 3 }
		// Add more options as needed
	];

	function handleSelect(event: CustomEvent<string>): void {
		console.log(event);
		if (selectedExpense) {
			selectedExpense.expense_category = event.detail;
		}
	}
</script>

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
		<Dropdown
			options={dropdownOptions}
			on:select={handleSelect}
			currentOption={selectedExpense?.expense_category}
		/>
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
			bind:value={newExpense.created_at}
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
				class="bg-blue-500 rounded-lg px-8 py-2 text-lg text-white tracking-wide font-semibold font-sans"
				on:click|preventDefault={editExpense}>Apply</button
			>
		</div>
	</td>
</tr>
