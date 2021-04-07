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
    _cards = [];
    _user = {};

    _getCard(id) {
        return this._cards.find(card => card.id === id);
    }

    _getPriority() {
        let prevChance = 0;
        return Object.keys(CardProbability).reduce((result, key) => {
            const chance = Math.random() * CardProbability[key];
            if (chance <= prevChance || !this._cards.find(card => card.priority === key)) {
                return result;
            }
            prevChance = chance;
            return key;
        }, '');
    }

    init(username) {
        return requestService.getUser(username)
            .then(resp => {
                if (!resp.user) {
                    throw new Error('wrong user name');
                }
                console.log('card deck init user', resp.user); // TODO remove dev code
                this._user = resp.user;
                return requestService.getAll(this._user.name)
            })
            .then(resp => {
                console.log('card deck init cards', resp); // TODO remove dev code
                this._cards = resp;
                return this._user;
            });
    }

    getActiveCard() {
        return new Promise((resolve, reject) => {
            const curPriority = this._getPriority();
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

    shuffleCards() {
        // randomize lastSeenAt from cards.length numbers
    }

    rankCard(id, priority) {
        const curCard = this._getCard(id);
        const resCard = {
            ...curCard,
            priority
        };
        const priorities = Object.values(CardPriority);
        if (priorities.indexOf(resCard.priority) < priorities.indexOf(curCard.priority)) {
            resCard.lastSeenAt = 0;
        }
        return requestService.update(resCard)
            .then(resp => {
                curCard.priority = resp.priority;
                curCard.lastSeenAt = resp.lastSeenAt;
            });
    }

    deleteCard(id) {
        return requestService.delete(id)
            .then(resp => {
                this._cards.splice(this._cards.indexOf(this._cards.find(card => card.id === parseInt(resp.id, 10))), 1);
            });
    }

    updateCard(card) {
        if (!card.id) {
            return requestService.add({
                user: this._user.name,
                translations: card.translations,
                example: card.example,
                priority: CardPriority.FRESH,
                lastSeenAt: Date.now()
            })
                .then(resp => {
                    this._cards.push(resp);
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
}

export const cardDeck = new CardDeck();