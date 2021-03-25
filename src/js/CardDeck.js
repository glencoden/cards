import { sampleCards } from './sampleCards';
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
    [CardPriority.LOW]: 1,
};


class CardDeck {
    cards = [];

    constructor(cards = []) {
        this.cards = cards;
    }

    _getCard(id) {
        return this.cards.find(card => card.id === id);
    }

    _getPriority() {
        let prevChance = 0;
        return Object.keys(CardProbability).reduce((result, key) => {
            const chance = Math.random() * CardProbability[key];
            if (chance <= prevChance || !this.cards.find(card => card.priority === key)) {
                return result;
            }
            prevChance = chance;
            return key;
        }, '');
    }

    getActiveCardId(onSuccess, onError) {
        const curPriority = this._getPriority();
        const activeCard = this.cards
            .filter(card => card.priority === curPriority)
            .reduce((r, e) => (r && r.lastSeenAt < e.lastSeenAt) ? r : e, null);
        activeCard.lastSeenAt = Date.now();
        onSuccess(activeCard.id);
    }

    getCards(onSuccess, onError) {
        requestService.getAll().then(resp => onSuccess(resp));
    }

    deleteCard(id, onSuccess, onError) {
        requestService.delete(id).then(resp => onSuccess(resp));
    }

    rankCard(id, priority, onSuccess, onError) {
        const curCard = this._getCard(id);
        if (!curCard) {
            onError();
            return;
        }
        const resCard = {
            ...curCard,
            priority
        };
        requestService.update(resCard).then(resp => onSuccess(resp));

        // set lastSeen so that card comes first IF priority is set higher (maybe to 0?)
    }

    addCard(translations, examples, onSuccess, onError) {
        requestService.add({
            translations,
            examples,
            priority: CardPriority.FRESH,
            lastSeenAt: Date.now()
        }).then(resp => {
            this.cards.push(resp);
            onSuccess(this.cards);
        });
    }
}

export const cardDeck = new CardDeck();