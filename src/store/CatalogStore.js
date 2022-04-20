import {makeAutoObservable} from "mobx";

export default class CatalogStore {
    constructor() {
        this._showCatalog = false
        makeAutoObservable(this)
    }

    setShowCatalog(bool) {
        this._showCatalog = bool
    }

    get showCatalog() {
        return this._showCatalog
    }
}