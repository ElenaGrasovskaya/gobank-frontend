<script lang="ts">
	import { loadExpense, expenses } from '$lib/stores/ExpenseStore';
	import { API_URL } from '../service/constants';
	import type { ExpenseType } from '../../global';
	import Dropdown from './Dropdown.svelte';
	import { user } from '$lib/stores/UserStore';
	import { createNewExpense } from '$lib/service/createExpense';
	import { compareDesc } from 'date-fns/compareDesc';

	const dropdownOptions = [
		{ label: 'Groseries', value: 1 },
		{ label: 'Car', value: 2 },
		{ label: 'Rent', value: 3 },
		{ label: 'Clothes', value: 4 },
		{ label: 'Appliances', value: 5 }
	];

	export let newExpense: ExpenseType = {
		id: NaN,
		user_id: $user.id,
		expense_name: '',
		expense_value: 0,
		expense_category: '',
		expense_purpose: '',
		created_at: new Date(),
		updated_at: new Date()
	};
	function handleSelect(event: CustomEvent<string>): void {
		newExpense.expense_category = event.detail;
	}

	async function createExpense() {
		$expenses = [newExpense, ...$expenses].sort((a, b) => compareDesc(a.created_at, b.created_at));
		const responce = await createNewExpense(newExpense);
		console.log("Creating expense responce", responce )
		loadExpense();
		newExpense = {
			id: NaN,
			user_id: $user.id,
			expense_name: '',
			expense_value: 0,
			expense_category: '',
			expense_purpose: '',
			created_at: new Date(),
			updated_at: new Date()
		};
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
		<Dropdown options={dropdownOptions} on:select={handleSelect} />
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
				class="bg-teal-500 rounded-lg py-2 text-lg px-6 text-white tracking-wide font-semibold font-sans"
				on:click|preventDefault={() => createExpense()}>+Create</button
			>
		</div>
	</td>
</tr>
