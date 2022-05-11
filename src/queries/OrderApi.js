import {$authHost, $host} from "./index";

export const createOrder = async order => {
    const {data} = await $host.post('api/order', order)
    return data
}

export const getUserOrders = async id => {
    const {data} = await $authHost.get(`api/order/${id}`)
    return data
}