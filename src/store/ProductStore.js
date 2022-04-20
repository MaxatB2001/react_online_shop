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
        this._reviews = [];
        makeAutoObservable(this)
    }

    setParentCategories(categories) {
        this._parentCategories = categories;
    }

    setCategories(categories) {
        this._categories = categories;
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

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setProducts(products) {
        this._products = products;
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

    get selectedBrand() {
        return this._selectedBrand;
    }

    get allCategories() {
        return this._allCategories;
    }
}