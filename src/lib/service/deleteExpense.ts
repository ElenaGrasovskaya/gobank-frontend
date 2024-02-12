import { API_URL } from "./constants";

export async function deleteExpense(id:number) {
		
    console.log('Deleting expense', id);
    try{
        const response = await fetch(`${API_URL}/expense/${id}`, {
            method: 'DELETE', // Specify the method
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error rdeleting expense:', error);
    }
}