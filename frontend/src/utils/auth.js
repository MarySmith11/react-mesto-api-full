export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (response) => {
  if (response.ok && response.status !== 400 && response.status !== 401) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так! Попробуйте ещё раз.`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse)
    .then((res) => {
      return res;
    });
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse)
    .then((res) => {
      return res;
    });
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(getResponse)
    .then(data => data);
}
