import { useReducer, useEffect } from 'react';
import { cardDeck } from './js/CardDeck';


// adapter

const ActionTypes = {
    SET_USER: 'set-user',
    SET_CARD: 'set-card',
    TURN_CARD: 'turn-card'
};

const initState = {
    user: null,
    card: null,
    cardTurned: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.user };
        case ActionTypes.SET_CARD:
            return { ...state, card: action.card, cardTurned: false };
        case ActionTypes.TURN_CARD:
            return { ...state, cardTurned: true };
        default:
            return { ...state };
    }
};


// ui

function App() {
    const [ state, dispatch ] = useReducer(reducer, initState);

    useEffect(() => {
        cardDeck.init('meyer')
            .then(user => dispatch({ type: ActionTypes.SET_USER, user }))
            .then(() => cardDeck.getActiveCard())
            .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
            .catch(err => console.error(err));
    }, [ dispatch ]);

    return (
        <div className="App">
            {state.card ? (
                <div>
                    {state.cardTurned ? (
                        <p>{JSON.stringify(state.card.translations.to)}</p>
                    ) : (
                        <p>{JSON.stringify(state.card.translations.from)}</p>
                    )}
                </div>
            ) : (
                <p>no active card</p>
            )}

            <button
                onClick={() => dispatch({ type: ActionTypes.TURN_CARD })}
            >
                turn card
            </button>
            <button
                onClick={() => {
                    cardDeck.getActiveCard()
                        .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
                        .catch(err => console.error(err));
                }}
            >
                next card
            </button>
            <button
                onClick={() => {
                    cardDeck.addCard({ from: 'Deutsch', to: 'Chinese' }, 'glen was here')
                        .then(() => {
                            cardDeck.getActiveCard()
                                .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
                                .catch(err => console.error(err));
                        });
                }}
            >
                add card
            </button>
            <button
                onClick={() => {
                    cardDeck.updateCard(state.card?.id, { from: 'Deutsch', to: 'Italiano' }, 'glen was here')
                        .then(() => {
                            cardDeck.getActiveCard()
                                .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
                                .catch(err => console.error(err));
                        });
                }}
            >
                update card
            </button>
        </div>
    );
}

export default App;
