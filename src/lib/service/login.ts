import type { userLoginType } from "../../global";
import { API_URL } from "./constants";
import { user } from '$lib/stores/UserStore';

export async function login(userData:userLoginType) {
    try {
        console.log('Starting login', API_URL);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        user.set(result);
       
    } catch (error) {
        console.error('Error logging user:', error);
    }
}
