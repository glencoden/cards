import { requestService } from './RequestService';

export const CardPriority = {
    FRESH: 'fresh',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

const CardProbability = {
    [CardPriority.FRESH]: 10,
    [CardPriority.HIGH]: 4,
    [CardPriority.MEDIUM]: 2,
    [CardPriority.LOW]: 1
};

function getCardId(cards) {
    const mostRecentCard = cards[cards.length - 1];
    let threshold = 0;

    return cards.reduce((result, card) => {
        const curThreshold = Math.floor(CardProbability[card.priority] * (mostRecentCard.lastSeenAt - card.lastSeenAt) * Math.random());
        if (curThreshold < threshold) {
            return result;
        }
        threshold = curThreshold;
        return card.id;
    }, 0);
}


class CardDeck {
    _user = {};
    _cards = [];
    _numCardsSeen = 0;

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

    getActiveCard(id) {
        return new Promise((resolve, reject) => {
            if (!this._cards.length) {
                reject('no cards');
                return;
            }

            const activeCard = this._getCard(id || getCardId(this._cards));

            if (!activeCard) {
                reject('no active card');
                return;
            }

            const age = Date.now() - activeCard.lastSeenAt;
            const minute = 1000 * 60;
            const hour = minute * 60;
            const day = hour * 24;
            const ageDays = Math.floor(age / day);
            const ageHours = Math.floor((age % day) / hour);
            const ageMinutes = Math.floor(((age % day) % hour) / minute);
            activeCard.spec = {
                cardPosition: this._cards.indexOf(activeCard),
                timeShowToRanking: `${5128 / 1000}s`,
                timeSinceLastSeen: `${ageDays}d ${ageHours}h ${ageMinutes}m`,
                priorityDistribution: Object.values(CardPriority).reduce((result, priority) => {
                    result[priority] = this._cards.filter(card => card.priority === priority).length;
                    return result;
                }, {})
            };

            activeCard.lastSeenAt = Date.now();
            this._sortCards();
            this._numCardsSeen++;

            resolve(activeCard);
        });
    }

    getNumCards() {
        return this._cards.length;
    }

    getNumCardsSeen() {
        return this._numCardsSeen;
    }

    getSearchItems() {
        return this._cards.map(card => Object.values(card.translations.from)[0]);
    }

    getIdBySearchItem(searchItem) {
        const card = this._cards.find(card => Object.values(card.translations.from)[0] === searchItem);
        if (!card) {
            console.warn('no card for search item', searchItem);
            return;
        }
        return card.id;
    }

    upsertCard(card) {
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

    deleteCard(id) {
        return requestService.delete(id)
            .then(resp => {
                this._removeCard(resp.id);
            });
    }

    rankCard(id, priority) {
        if (!Object.values(CardPriority).includes(priority)) {
            return Promise.reject('no priority');
        }
        const curCard = this._getCard(id);
        return requestService.update({
            ...curCard,
            priority
        })
            .then(resp => {
                curCard.priority = resp.priority;
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