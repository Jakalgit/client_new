import {$host} from "../index";

/* Работа с брендами */

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}