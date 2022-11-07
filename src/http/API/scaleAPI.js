import {$host} from "../index";

export const fetchScales = async () => {
    const {data} = await $host.get('api/scale/all/')
    return data
}