import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cardDeck } from './js/CardDeck';

// const initState = {
//     user: null,
//     card: null,
//     cardTurned: false
// };
//
// const reducer = (state, action) => {
//     switch (action.type) {
//         case ActionTypes.SET_USER:
//             return { ...state, user: action.user };
//         case ActionTypes.SET_CARD:
//             return { ...state, card: action.card, cardTurned: action.cardTurned };
//         case ActionTypes.TURN_CARD:
//             return { ...state, cardTurned: !state.cardTurned };
//         default:
//             return { ...state };
//     }
// };

export const login = createAsyncThunk(
    'login',
    async input => {
        return await cardDeck.init(input);
    }
);

export const getActiveCard = createAsyncThunk(
    'getActiveCard',
    async () => {
        return await cardDeck.getActiveCard();
    }
);

export const deleteCard = createAsyncThunk(
    'deleteCard',
    async id => {
        return await cardDeck.deleteCard(id);
    }
);


export const CardSide = {
    A: 'a',
    B: 'b'
};

const CardShowOrder = {
    A_TO_B: 'a-to-b',
    B_TO_A: 'b-to-a',
    RANDOM: 'random'
};


export const adapter = createSlice({
    name: 'app',
    initialState: {
        user: null,
        activeCard: null,
        showSide: CardSide.A,
        showOrder: CardShowOrder.A_TO_B,
        hasBeenTurned: false,
        stageDeleteId: 0
    },
    reducers: {
        turnCard: state => {
            switch (state.showSide) {
                case CardSide.A:
                    state.showSide = CardSide.B;
                    break;
                case CardSide.B:
                    state.showSide = CardSide.A;
                    break;
                default:
            }
            state.hasBeenTurned = true;
        },
        setStageDeleteId: (state, action) => {
            state.stageDeleteId = action.payload;
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.error) {
                console.log(action.error);
                return;
            }
            state.user = action.payload;
        },
        [getActiveCard.fulfilled]: (state, action) => {
            if (action.error) {
                console.log(action.error);
                return;
            }
            switch (state.showOrder) {
                case CardShowOrder.A_TO_B:
                    state.showSide = CardSide.A;
                    break;
                case CardShowOrder.B_TO_A:
                    state.showSide = CardSide.B;
                    break;
                case CardShowOrder.RANDOM:
                    state.showSide = Math.random() < 0.5 ? CardSide.A : CardSide.B;
                    break;
                default:
            }
            state.activeCard = action.payload;
            state.hasBeenTurned = false;
        }
    }
});

export const { turnCard, setStageDeleteId } = adapter.actions;

// export const viewportSize = state => ({
//     vw: state.harbor.vw,
//     vh: state.harbor.vh
// });
//
// export const contentSize = state => ({
//     cw: state.harbor.cw,
//     ch: state.harbor.ch
// });

export default adapter.reducer;
