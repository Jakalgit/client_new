import {$host} from "../index";

/* Работа с категориями */

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}