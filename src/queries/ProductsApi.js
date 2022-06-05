import {$host, $authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/categories', category)
    return data
}

export const fetchParentCategories = async () => {
    const {data} = await $host.get('api/categories')
    return data
}

export const fetchSubCategoriesOrProducts = async (slug, brandId, page, limit= 5, min, max) => {
    const {data} = await $host.get(`api/categories/${slug}`, {params: {
            brandId,
            page,
            limit,
            min,
            max
        }})
    return data
}

export const fetchAllCategories = async () => {
    const {data} = await $host.get('api/categories/all')
    return data
}

export const fetchPopularCategories = async () => {
    const {data} = await $host.get('api/categories/popular')
    console.log(data)
    return data
}

export const fetchLatestCategories = async () => {
    const {data} = await $host.get('api/categories/latest')
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    console.log(data)
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

export const createComment = async (review) => {
    const {data} = await $host.post(`api/product/review`, review)
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

export const fetchAlikeProducts = async (categoryId, brandId, price) => {
    const {data} = await $host.get('api/product/alike', {
        params: {
            categoryId,
            brandId,
            price,
        }
    })
    return data;
}

export const fetchLatestProducts = async () => {
    const {data} = await $host.get('api/product/latest')
    return data;
}

export const searchProducts = async (query) => {
    const {data} = await $host.get(`api/product/search/${query}`)
    console.log(data)
    return data;
}