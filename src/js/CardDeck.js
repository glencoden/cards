import { requestService } from './RequestService';

export const CardPriority = {
    FRESH: 'fresh',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

const CardProbability = {
    [CardPriority.FRESH]: 6,
    [CardPriority.HIGH]: 4,
    [CardPriority.MEDIUM]: 3,
    [CardPriority.LOW]: 1
};


class CardDeck {
    _user = {};
    _cards = [];

    init(username) {
        return requestService.getUser(username)
            .then(resp => {
                if (!resp.user) {
                    throw new Error('wrong user name');
                }
                this._setUser(resp.user);
                return requestService.getAll(this._user.name)
            })
            .then(resp => {
                this._setCards(resp);
                return this._user;
            });
    }

    getActiveCard() {
        return new Promise((resolve, reject) => {
            // new approach
            const pr = this._cards.reduce((r, e, i) => [ ...r, `${Math.round(CardProbability[e.priority] * (this._cards.length - i) * Math.random())} ${e.lastSeenAt}` ], []);
            console.log(pr);// TODO remove dev code

            // get priority
            let prevChance = 0;
            const curPriority = Object.keys(CardProbability).reduce((result, key) => {
                const chance = Math.random() * CardProbability[key];
                if (chance <= prevChance || !this._cards.find(card => card.priority === key)) {
                    return result;
                }
                prevChance = chance;
                return key;
            }, '');
            // find active card
            const activeCard = this._cards
                .filter(card => card.priority === curPriority)
                .reduce((r, e) => (r && (r.lastSeenAt < e.lastSeenAt)) ? r : e, null);
            if (!activeCard) {
                reject('no active card');
                return;
            }
            activeCard.lastSeenAt = Date.now();
            resolve(activeCard);
        });
    }

    getNumCards() {
        return this._cards.length;
    }

    rankCard(id, priority) {
        const curCard = this._getCard(id);
        const resCard = {
            ...curCard,
            priority
        };
        return requestService.update(resCard)
            .then(resp => {
                curCard.priority = resp.priority;
                curCard.lastSeenAt = resp.lastSeenAt;
                this._sortCards();
            });
    }

    deleteCard(id) {
        return requestService.delete(id)
            .then(resp => {
                this._removeCard(resp.id);
            });
    }

    updateCard(card) {
        // add new
        if (!card.id) {
            return requestService.add({
                user: this._user.name,
                translations: card.translations,
                example: card.example,
                priority: CardPriority.FRESH,
                lastSeenAt: Date.now()
            })
                .then(resp => {
                    this._addCard(resp);
                    return resp;
                });
        }
        // update
        const curCard = this._getCard(card.id);
        if (!curCard) {
            return Promise.reject('no card to update');
        }
        return requestService.update({
            ...curCard,
            translations: {
                ...curCard.translations,
                ...card.translations
            },
            example: card.example
        })
            .then(resp => {
                curCard.translations = resp.translations;
                curCard.example = resp.example;
                return curCard;
            });
    }

    _setUser(raw) {
        this._user = raw;
        console.log('card deck set user', this._user); // TODO remove dev code
    }

    _setCards(raw) {
        this._cards = raw;
        this._sortCards();
        console.log('card deck set cards', this._cards); // TODO remove dev code
    }

    _sortCards() {
        this._cards = this._cards.sort((a, b) => a.lastSeenAt - b.lastSeenAt);
    }

    _getCard(id) {
        return this._cards.find(card => card.id === id);
    }

    _addCard(card) {
        this._cards.unshift(card);
    }

    _removeCard(id) {
        this._cards.splice(this._cards.indexOf(this._cards.find(card => card.id === parseInt(id, 10))), 1);
    }
}

export const cardDeck = new CardDeck();