const rootUrl = 'http://localhost';
const baseUrl = `${rootUrl}/cards`;


class RequestService {
    _get(url) {
        return fetch(url).then(resp => resp.json());
    }

    getAll() {
        return this._get(`${baseUrl}/all`);
    }

    delete(id) {
        return this._get(`${baseUrl}/delete/${id}`);
    }

    add(card) {
        // upsert card
    }

    update(card) {
        // upsert card
    }
}

export const requestService = new RequestService();