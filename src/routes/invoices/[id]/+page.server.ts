import { error } from "@sveltejs/kit";

export function load ({params}) {
    if(params.id) {
        return {id: params};
    } else {
        throw error (404)
    }
}