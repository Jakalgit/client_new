import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAdmin = false
        this._user = {}
        this._basketId = {}
        this._searchValue = ''
        this._searchOrders = []
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setBasket(basketId) {
        this._basketId = basketId
    }

    setSearchValue(searchValue) {
        this._searchValue = searchValue
    }

    setSearchOrders(value) {
        this._searchOrders = value
    }

    get user() {
        return this._user
    }

    get isAdmin() {
        return this._isAdmin
    }

    get basket() {
        return this._basketId
    }

    get searchValue() {
        return this._searchValue
    }

    get searchOrders() {
        return this._searchOrders
    }
}