class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._baseHeaders = options.headers;
    }

    getUserInfo() {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                headers: this._baseHeaders,
                credentials: 'include',
            }
        ).then((res) => this._getResponse(res, 'Произошла ошибка при получении информации о пользователе'));
    }

    getInitialCards() {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                headers: this._baseHeaders,
                credentials: 'include',
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при получении карточек'));
    }

    updateUserProfile({ name, about }) {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._baseHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    about
                })
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при обновлении профиля пользователя'));
    }

    updateUserAvatar(avatar) {
        return fetch(
            `${this._baseUrl}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._baseHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    avatar
                })
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при обновлении аватара пользователя'));
    }

    addNewCard({ name, link }) {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                method: 'POST',
                headers: this._baseHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    link
                })
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при добавлении новой карточки'));
    }

    removeCard(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._baseHeaders,
                credentials: 'include',
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при удалении карточки'));
    }

    likeAction(cardId, type) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: type,
                headers: this._baseHeaders,
                credentials: 'include',
            }
        )
            .then((res) => this._getResponse(res, 'Произошла ошибка при постановке лайка'));
    }

    _getResponse(res, errorText) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${errorText}: ${res.status} ${res.statusText}`);
    }
} 

const apiInstance = new Api( 
    { 
      baseUrl: 'https://backend.marysmith.nomoredomains.sbs', 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    } 
); 

export default apiInstance;