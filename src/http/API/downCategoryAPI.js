import {$host} from "../index";

/* Работа с категориями */
export const fetchDownCategories = async () => {
    const {data} = await $host.get('api/categorydown')
    return data
}