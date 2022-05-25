import {$authHost, $host} from "./index";

export const createOrder = async order => {
    $host.post('api/order', order).then(r => console.log(r)).catch(e => console.log(e.response))
}

export const getUserOrders = async id => {
    const {data} = await $authHost.get(`api/order/${id}`)
    console.log(data)
    return data
}

export const getOrderdsByMonth = async () => {
    const {data} = await $authHost.get('api/order')
    console.log(data)
    return data;
}

export const getSumOrders = async () => {
    const {data} = await $authHost.get('api/order/total')
    console.log(data)
    return data;
}

export const getProductOrdersMonthCount = async () => {
    const {data} = await $host.get('api/product/monthSales')
    return data;
}