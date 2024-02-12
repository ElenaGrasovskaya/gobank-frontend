<script lang="ts">
	import type { ExpenseType } from '../../global';
	export let currentExpense: ExpenseType;
	import { loadExpense, selectedExpenseId, expenses } from '$lib/stores/ExpenseStore';
	import { deleteExpense } from '$lib/service/deleteExpense';

	async function editExpense(currentId = 0) {
		$selectedExpenseId = currentId;
	}

	async function deleteCurrentExpense(currentId = 0) {
		let temp = $expenses[currentId];
		$expenses = $expenses.filter((item) => item.id !== currentId);
		try {
			await deleteExpense(currentId);
		} catch (error) {
			console.error(error);
		}
		await loadExpense();
	}
</script>

<tr>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<div class="flex items-center">
			<div class="ml-3">
				<p class="text-gray-900 whitespace-no-wrap">
					{#if !isNaN(currentExpense.id) && currentExpense.id !== 0}
						{currentExpense.id}
					{/if}
				</p>
			</div>
		</div>
	</td>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<p class="text-gray-900 whitespace-no-wrap px-4">{currentExpense.expense_name}</p>
	</td>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<p class="text-gray-900 whitespace-no-wrap px-4">{currentExpense.expense_category}</p>
	</td>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<p class="text-gray-900 whitespace-no-wrap px-4">
			{currentExpense.expense_value}
		</p>
	</td>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<p class="text-gray-900 whitespace-no-wrap px-4">
			{currentExpense.updated_at}
		</p>
	</td>
	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<p class="text-gray-900 whitespace-no-wrap px-4">
			{currentExpense.expense_purpose}
		</p>
	</td>

	<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
		<button
			type="button"
			class=" bg-blue-300 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
			on:click|preventDefault={() => editExpense(currentExpense.id)}
			><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="edit"
				><path fill="none" d="M0 0h24v24H0V0z"></path><path
					d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
				></path></svg
			></button
		>

		<button
			type="button"
			class=" bg-red-300 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
			on:click|preventDefault={() => deleteCurrentExpense(currentExpense.id)}
			><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete"
				><path
					fill="#000"
					d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"
				></path><path
					fill="#000"
					fill-rule="evenodd"
					d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z"
					clip-rule="evenodd"
				></path></svg
			></button
		>
	</td>
</tr>
