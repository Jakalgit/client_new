import {$host} from "../index";

/* Работа с товарами */
export const fetchFullItems = async (role) => {
    const {data} = await $host.get('api/item/all', {headers: {authorization: role}})
    return data
}

export const fetchItems = async () => {
    const {data} = await $host.get('api/item/')
    return data
}

export const fetchPageItems = async (categoryId, categoryDownId, brandId, scaleId, availability, visibility, discount_flag, page) => {
    const {data} = await $host.get('api/item/page', {params: {
            categoryId, categoryDownId, brandId, scaleId, availability, visibility, discount_flag, page
        }})
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const changeName = async (role, name, id) => {
    const {data} = await  $host.post('api/item/change-name', {name, id}, {headers: {authorization: role}})
    return data
}

export const fetchAllInfo = async (itemId) => {
    const {data} = await $host.get('api/info', {params: {itemId}})
    return data
}