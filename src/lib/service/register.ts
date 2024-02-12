import type { userRegisterType } from "../../global";
import { API_URL } from "./constants";

export async function register(userData: userRegisterType) {
    try {
        console.log('Starting register with ', userData);
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {

            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error('Error registering user:', error);
    }
}

