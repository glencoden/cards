import { useReducer, useEffect } from 'react';
import { cardDeck } from './js/CardDeck';
import { requestService } from './js/RequestService';


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
        requestService.getUser('ponkel')
            .then(user => {
                dispatch({ type: ActionTypes.SET_USER, user });
                return cardDeck.init();
            })
            .then(() => cardDeck.getActiveCard())
            .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
            .catch(err => console.error(err));
    }, [ dispatch ]);

    return (
        <div className="App">
            <p style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(state, null, 4)}</p>
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
