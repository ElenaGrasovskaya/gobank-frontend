import { API_URL } from "./constants";
import { user } from '$lib/stores/UserStore';
import {expenses } from '$lib/stores/ExpenseStore';

export async function logout() {
    try {
        console.log('Starting logout');
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        user.set({
            id: 0,
            email: '',
            first_name: '',
            last_name: ''
        });
        expenses.set([]);

        return result;
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}
