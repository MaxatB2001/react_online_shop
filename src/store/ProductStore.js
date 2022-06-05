import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._parentCategories = [];
        this._categories = [];
        this._allCategories = [];
        this._brands = [];
        this._products = [];
        this._selectedCategory = {};
        this._selectedBrand = {};
        this._selectedBrands = [];
        this._reviews = [];
        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;
        this._watchedRecently = [];
        this._minPrice = 0;
        this._maxPrice = 0;
        makeAutoObservable(this)
    }

    setParentCategories(categories) {
        this._parentCategories = categories;
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setMaxPrice(price) {
        this._maxPrice = price;
    }

    setMinPrice(price) {
        this._minPrice = price;
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand;
    }

    setAllCategories(categories) {
        this._allCategories = categories;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setReviews(reviews) {
        this._reviews = reviews;
    }

    setSelectedBrands(brands) {
        this._selectedBrands = brands;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setProducts(products) {
        this._products = products;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get maxPrice() {
        return this._maxPrice;
    }

    get minPrice() {
        return this._minPrice;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }

    get parentCategories() {
        return this._parentCategories;
    }

    get categories() {
        return this._categories;
    }

    get brands() {
        return this._brands;
    }

    get products() {
        return this._products;
    }

    get reviews() {
        return this._reviews;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedBrands() {
        return this._selectedBrands;
    }

    get allCategories() {
        return this._allCategories;
    }

    initialWatchedRecently() {
        if (localStorage.getItem('watchedRecently')) {
            this._watchedRecently = JSON.parse(localStorage.getItem('watchedRecently'));
        } else {
            localStorage.setItem('watchedRecently', JSON.stringify(this._watchedRecently))
        }
    }

    updateWatchedRecently() {
        localStorage.setItem('watchedRecently', JSON.stringify(this._watchedRecently))
    }

    get watchedRecently() {
        return this._watchedRecently
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    addToWatchedRecently(product) {
        const exist = this._watchedRecently.filter(p => p.id === product.id)

        if (!exist.length) {
            this._watchedRecently.push(product)
            this.updateWatchedRecently()
        }
    }
}