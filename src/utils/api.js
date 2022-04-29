import { config } from './config'

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
}

class Api {
    constructor({ url, token }) {
        this._url = url
        this._token = token
    }

    getPost(itemID) {
        const requestUrl = itemID ? `${this._url}/posts/${itemID}` : `${this._url}/posts`
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    addLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    deleteLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    getCommentPost(itemID) {
        return fetch(`${this._url}/posts/comments/${itemID}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    addComments(itemID, comments ) {
        return fetch(`${this._url}/posts/comments/${itemID}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comments),
        }).then(onResponce)
    }

    deleteComments(itemID, commentID) {
        return fetch(`${this._url}/posts/comments/${itemID}/${commentID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    editCurentUser(updatedUserInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo),
        }).then(onResponce);
    }

    editAvatarUser(updateAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateAvatar),
        }).then(onResponce);
    }

    addPost(posts) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(posts),
        }).then(onResponce)
    }

    editPost(itemID, editItem) {
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editItem),
        }).then(onResponce)
    }

    deletePost(itemID) {
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }
}

export default new Api(config)
