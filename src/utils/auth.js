export const BASE_URL = 'https://auth.nomoreparties.co'


export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }


    return Promise.reject(`Ошибка: ${res.status}`)
}

export function signupUser(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email, password
        })
    })
        .then(res => checkResponse(res))
};

export function signinUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password, password
        })
    })
        .then(res => checkResponse(res))
};

export function authtorize(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    })
        .then(res => checkResponse(res))
}