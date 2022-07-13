import {$host} from "./index";

/* Работа с категориями */
export const createCategory = async (object) => {
    const {data} = await $host.post('api/category', {name: object.value}, {headers: {authorization: object.role}})
    return data
}

export const changeCategoryName = async (role, name, id) => {
    const {data} = await $host.post('api/category/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const deleteCategory = async (role, id) => {
    const {data} = await $host.post('api/category/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}

/* Работа с брендами */
export const createBrand = async (object) => {
    const {data} = await $host.post('api/brand', {name: object.value}, {headers: {authorization: object.role}})
    return data
}

export const changeNameBrand = async (role, name, id) => {
    const {data} = await $host.post('api/brand/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const deleteBrand = async (role, id) => {
    const {data} = await $host.post('api/brand/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

/* Работа с категориями */
export const createDownCategory = async (object) => {
    const {data} = await $host.post('api/categorydown', {name: object.value, categoryId: object.categoryId}, {headers: {authorization: object.role}})
    return data
}

export const changeNameCategoryDown = async (role, name, id) => {
    const {data} = await $host.post('api/categorydown/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const deleteCategoryDown = async (role, id) => {
    const {data} = await $host.post('api/categorydown/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchDownCategories = async () => {
    const {data} = await $host.get('api/categorydown')
    return data
}

/* Работа с товарами */
export const createItem = async (object) => {
    const {data} = await $host.post('api/item', object.formData, {headers: {authorization: object.role}})
    return data
}

export const fetchFullItems = async (role) => {
    const {data} = await $host.get('api/item/all', {headers: {authorization: role}})
    return data
}

export const fetchItems = async (categoryId, categoryDownId, brandId, availability, visibility, page) => {
    const {data} = await $host.get('api/item', {params: {
            categoryId, categoryDownId, brandId, availability, visibility, page
        }})
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const changeName = async (role, name, id) => {
    const {data} = await  $host.post('api/item/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const changePrice = async (role, price, id) => {
    const {data} = await $host.post('api/item/changeprice', {price, id}, {headers: {authorization: role}})
    return data
}

export const changeParams = async (role, categoryId, downCategoryId, brandId, id) => {
    const {data} = await $host.post('api/item/changeparams', {categoryId, downCategoryId, brandId, id}, {headers: {authorization: role}})
    return data
}

export const changeAvailability = async (role, availability, id) => {
    const {data} = await $host.post('api/item/changeavailability', {availability, id}, {headers: {authorization: role}})
    return data
}

export const changeVisibility = async (role, visibility, id) => {
    const {data} = await $host.post('api/item/changevisibility', {visibility, id}, {headers: {authorization: role}})
    return data
}

export const changeImg1 = async (role, formData) => {
    const {data} = await $host.post('api/item/changeimg1', formData, {headers: {authorization: role}})
    return data
}

export const changeImg2 = async (role, formData) => {
    const {data} = await $host.post('api/item/changeimg2', formData, {headers: {authorization: role}})
    return data
}

export const changeImg3 = async (role, formData) => {
    const {data} = await $host.post('api/item/changeimg3', formData, {headers: {authorization: role}})
    return data
}

export const changeImg4 = async (role, formData) => {
    const {data} = await $host.post('api/item/changeimg4', formData, {headers: {authorization: role}})
    return data
}

export const changeLength = async (role, length, id) => {
    const {data} = await $host.post('api/item/changelength', {length, id}, {headers: {authorization: role}})
    return data
}

export const changeWidth = async (role, width, id) => {
    const {data} = await $host.post('api/ite/changewidth', {width, id}, {headers: {authorization: role}})
    return data
}

export const changeHeight = async (role, height, id) => {
    const {data} = await $host.post('api/item/changeheight', {height, id}, {headers: {authorization: role}})
    return data
}

export const changeWeight = async (role, weight, id) => {
    const {data} = await $host.post('api/item/changeweight', {weight, id}, {headers: {authorization: role}})
    return data
}

export const createItemInfo = async (role, info, itemId) => {
    const {data} = await $host.post('api/info', {info, itemId}, {headers: {authorization: role}})
    return data
}

export const fetchAllInfo = async (itemId) => {
    const {data} = await $host.get('api/info', {params: {itemId}})
    return data
}

export const changeInfo = async (role, info, id) => {
    const {data} = await $host.post('api/info/changeinfo', {info, id}, {headers: {authorization: role}})
    return data
}

export const deleteInfo = async (role, id) => {
    const {data} = await $host.post('api/info/delete', {id}, {headers: {authorization: role}})
    return data
}

/* Работа с корзиной */
export const initBasket = async (id) => {
    const {data} = await $host.post('api/basket/', {userId: id})
    return data
}


/* Работа с товарами в корзине */
export const createBasketItem = async (itemId, basketId, count) => {
    const {data} = await $host.post('api/basketitem/', {itemId, basketId, count})
    return data
}

export const incrementBasketItem = async (itemId, basketId) => {
    const {data} = await $host.post('api/basketitem/increment/', {itemId, basketId})
    return data
}

export const decrementBasketItem = async (itemId, basketId) => {
    const {data} = await $host.post('api/basketitem/decrement/', {itemId, basketId})
    return data
}

export const deleteOneBasketItem = async (itemId, basketId) => {
    const {data} = await $host.post('api/basketitem/deleteone/', {itemId, basketId})
    return data
}

export const deleteAllBasketItem = async (basketId) => {
    const {data} = await $host.post('api/basketitem/delete/', {basketId})
    return data
}

export const getAllBasketItems = async (basketId) => {
    const {data} = await $host.get('api/basketitem/', {params: {basketId}})
    return data
}

/* Работа с заказами */
export const createOrder = async (token, number, firstName, lastName, secondName, phoneNumber, email, index, street, house, flat, price, typePay, typeDelivery, typeSubmit) => {
    const {data} = await $host.post('api/order/', {token, number, firstName, lastName, secondName, phoneNumber, email, index, street, house, flat, price, typePay, typeDelivery, typeSubmit})
    return data
}

export const changeSubmit = async (role, id, typeSubmit) => {
    const {data} = await $host.post('api/order/change/', {id, typeSubmit}, {headers: {authorization: role}})
    return data
}

export const setTrackNumber = async (role, id, track) => {
    const {data} = await $host.post('api/order/settrack', {id, track}, {headers: {authorization: role}})
    return data
}

export const fetchOneOrder = async (role, id) => {
    const {data} = await $host.get('api/order/id/' + id, {headers: {authorization: role}})
    return data
}

export const fetchOneOrderByNumber = async (number) => {
    const {data} = await $host.get('api/order/number/' + number)
    return data
}

export const fetchOrdersByPhone = async (phone) => {
    const {data} = await $host.get('api/order/phone/' + phone)
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $host.get('api/order/')
    return data
}

export const deleteOrder = async (role, id) => {
    const {data} = await $host.post('api/order/delete', {id}, {headers: {authorization: role}})
    return data
}

/* Работа с товарами заказов */
export const createOrderItem = async (name, price, img, count, orderId) => {
    const {data} = await $host.post('api/orderitem/', {name, price, img, count, orderId})
    return data
}

export const fetchOrderItems = async (orderId) => {
    const {data} = await $host.get('api/orderitem/', {params: {orderId}})
    return data
}

export const fetchOrderItem = async (id) => {
    const {data} = await $host.get('api/orderitem/one/', {params: {id}})
    return data
}

export const incrementOrderItem = async (role, id) => {
    const {data} = await $host.post('api/orderitem/increment/', {id}, {headers: {authorization: role}})
    return data
}

export const decrementOrderItem = async (role, id) => {
    const {data} = await $host.post('api/orderitem/decrement/', {id}, {headers: {authorization: role}})
    return data
}

export const deleteOrderItem = async (role, id) => {
    const {data} = await $host.post('api/orderitem/delete/', {id}, {headers: {authorization: role}})
    return data
}

export const deleteOrderItems = async (role, orderId) => {
    const {data} = await $host.post('api/orderitem/delete/all/', {orderId}, {headers: {authorization: role}})
    return data
}
