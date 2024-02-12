import { writable } from "svelte/store";
import type { UserType } from "../../global";

export const user = writable<UserType>({
    id: 0,
    email: '',
    first_name: '',
    last_name: ''
});