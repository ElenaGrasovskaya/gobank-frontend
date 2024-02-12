import { writable } from "svelte/store";
import type { ExpenseType } from "../../global";
import { API_URL } from "$lib/service/constants";

export const expensesToDisplay = writable<ExpenseType[]>([]);
export const expenses = writable<ExpenseType[]>([]);
export const selectedExpenseId = writable<number>(0);

export const loadExpense = async () => {
    const response = await fetch(`${API_URL}/expense`, {
			method: 'GET',
			credentials: 'include'
		});
		const data = await response.json();

    expenses.set(data);
}