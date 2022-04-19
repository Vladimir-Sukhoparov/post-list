import { config } from './config'

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
}

class Api {
    constructor({ url, token }) {
        this._url = url
        this._token = token
    }

    getPost() {
        return fetch(`${this._url}/posts`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    

    /* addLike() {
        return fetch(`${this._url}/posts/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    deleteLike() {
        return fetch(`${this._url}/posts/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    } */

   getInfoUser(){
    return fetch(`${this._url}/users/me`, {
        headers: {
            authorization: `Bearer ${this._token}`,
        },
    }).then(onResponce)
   }
   
}

export default new Api(config)
