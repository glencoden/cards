const rootUrl = 'http://192.168.1.3:80';
// const rootUrl = 'https://wolke.glencoden.de';
const baseUrl = `${rootUrl}/cards`;


class RequestService {
    _get(url) {
        return fetch(url).then(resp => resp.json());
    }

    _post(url, data) {
        return Promise.resolve()
            .then(() => JSON.stringify(data))
            .then(body => fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body
            }))
            .then(resp => resp.json());
    }

    getUser(name) {
        return this._get(`${baseUrl}/user/${name}`);
    }

    getAll(username) {
        return this._get(`${baseUrl}/all/${username}`);
    }

    delete(id) {
        return this._get(`${baseUrl}/delete/${id}`);
    }

    add(card) {
        return this.update(card);
    }

    update(card) {
        return this._post(`${baseUrl}/upsert`, card);
    }
}

export const requestService = new RequestService();