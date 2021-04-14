import { createSlice } from '@reduxjs/toolkit';


// const ActionTypes = {
//     SET_USER: 'set-user',
//     SET_CARD: 'set-card',
//     TURN_CARD: 'turn-card'
// };
//
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

const CardShowOrder = {
    A_TO_B: 'a-to-b',
    B_TO_A: 'b-to-a',
    RANDOM: 'random'
};


export const adapter = createSlice({
    name: 'app',
    initialState: {
        user: null,
        card: null
    },
    reducers: {
        logout: state => {
            state.user = null;
        }
    }
});

export const { logout } = adapter.actions;

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
