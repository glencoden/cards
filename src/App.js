import { useReducer, useEffect } from 'react';
import { cardDeck } from './js/CardDeck';


// adapter

const ActionTypes = {
    SET_CARDS: 'set-cards',
    TURN_CARD: 'turn-card',
    NEXT_CARD: 'next-card'
};

const initState = {
    cards: [ 'init state' ],
    activeId: 0,
    cardTurned: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CARDS:
            return { ...state, cards: action.cards };
        case ActionTypes.TURN_CARD:
            return { ...state, cardTurned: true };
        case ActionTypes.NEXT_CARD:
            return { ...state, activeId: action.id, cardTurned: false };
        default:
            return { ...state };
    }
};


// ui

function App() {
    const [ state, dispatch ] = useReducer(reducer, initState);

    useEffect(() => {
        cardDeck.getCards(cards => dispatch({ cards, type: ActionTypes.SET_CARDS }));
    }, [ dispatch ]);

    return (
        <div className="App">
            {JSON.stringify(state, null, 4)}
            <button
                onClick={() => dispatch({ type: ActionTypes.TURN_CARD })}
            >
                turn card
            </button>
            <button
                onClick={() => dispatch({ type: ActionTypes.TURN_CARD })}
            >
                next card
            </button>
        </div>
    );
}

export default App;
