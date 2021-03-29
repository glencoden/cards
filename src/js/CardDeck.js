import { requestService } from './RequestService';

export const CardPriority = {
    FRESH: 'fresh',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

const CardProbability = {
    [CardPriority.FRESH]: 1000,
    [CardPriority.HIGH]: 3,
    [CardPriority.MEDIUM]: 2,
    [CardPriority.LOW]: 1
};


class CardDeck {
    _cards = [];
    _user = '';

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
                this._user = resp.user;
                return requestService.getAll()
            })
            .then(resp => {
                this._cards = resp;
                return this._user;
            });
    }

    getActiveCard() {
        return new Promise((resolve, reject) => {
            const curPriority = this._getPriority();
            const activeCard = this._cards
                .filter(card => card.priority === curPriority)
                .reduce((r, e) => (r && r.lastSeenAt < e.lastSeenAt) ? r : e, null);
            if (!activeCard) {
                reject('no active card');
                return;
            }
            activeCard.lastSeenAt = Date.now();
            resolve(activeCard);
        });
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
        return requestService.update(resCard)
            .then(resp => {
                curCard.priority = resp.priority;
            });

        // set lastSeen so that card comes first IF priority is set higher (maybe to lastSeen = 0?)
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
                translations: card.translations,
                example: card.example,
                priority: CardPriority.FRESH,
                lastSeenAt: Date.now()
            })
                .then(resp => {
                    this._cards.push(resp);
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
            });
    }
}

export const cardDeck = new CardDeck();