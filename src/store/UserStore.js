import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._isAdmin = false;
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    get isAdmin() {
        return this._isAdmin
    }

    logOut() {
        this.setIsAuth(false)
        this.setUser({})
        this.setIsAdmin(false)
        localStorage.removeItem('token')
    }
}