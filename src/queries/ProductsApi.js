import {$host, $authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/categories', category)
    return data
}

export const fetchParentCategories = async () => {
    const {data} = await $host.get('api/categories')
    return data
}

export const fetchSubCategoriesOrProducts = async (slug, brandId, page, limit= 5) => {
    const {data} = await $host.get(`api/categories/${slug}`, {params: {
            brandId,
            page,
            limit,
        }})
    return data
}

export const fetchAllCategories = async () => {
    const {data} = await $host.get('api/categories/all')
    return data
}

export const fetchPopularCategories = async () => {
    const {data} = await $host.get('api/categories/popular')
    return data
}

export const fetchLatestCategories = async () => {
    const {data} = await $host.get('api/categories/latest')
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createBrand = async (product) => {
    const {data} = await $authHost.post('api/brand', product)
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProduct = async (slug) => {
    const {data} = await $host.get(`api/product/${slug}`)
    return data
}

export const createComment = async (slug, review) => {
    const {data} = await $authHost.post(`api/product/review/${slug}`, review)
    return data
}

export const fetchComments = async (id) => {
    const {data} = await $host.get(`api/product/reviews/${id}`)
    return data;
}

export const fetchStars = async () => {
    const {data} = await $host.get('api/product/review/star')
    return data;
}

