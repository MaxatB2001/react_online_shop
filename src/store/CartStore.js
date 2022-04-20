import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this)
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this._items))
    }

    initial() {
        if (localStorage.getItem('cart')) {
            this._items = JSON.parse(localStorage.getItem('cart'))
        } else {
            localStorage.setItem('cart', JSON.stringify(this._items))
        }
    }

    addToCart(item) {
        const exists = this._items.filter(i => i.product.id === item.product.id)

        if (exists.length) {
            exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
        } else {
            this._items.push(item)
        }

        localStorage.setItem('cart', JSON.stringify(this._items))
    }

    get cartTotalLength() {
        return this._items.reduce((acc, curVal) => {
            return acc += curVal.quantity
        }, 0)
    }

    cartTotalPrice() {
        return this._items.reduce((acc, curVal) => {
            return acc += curVal.product.price * curVal.quantity
        }, 0)
    }

    removeFromCart(item) {
        this._items = this._items.filter(i => i.product.id !== item.product.id)
    }

    incrementQuantity(item) {
        item.quantity += 1

        this.updateCart()
    }

    decrementQuantity(item) {
        item.quantity -= 1

        if (item.quantity === 0) {
            this.removeFromCart(item)
        }

        this.updateCart()
    }

    getItemTotal(item) {
        return item.quantity * item.product.price
    }

    get items() {
        return this._items
    }

}