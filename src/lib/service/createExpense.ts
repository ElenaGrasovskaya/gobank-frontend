import type { ExpenseType } from "../../global";
import { API_URL } from "./constants";

export async function createNewExpense(newExpense:ExpenseType) {
    try {
        console.log('Starting creating new expense with ', newExpense);
        newExpense.created_at = new Date(newExpense.created_at); 
        const response = await fetch(`${API_URL}/expense`, {
            method: 'POST',
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
        return result;

    } catch (error) {
        console.error('Error creating an expense:', error);
    }

}