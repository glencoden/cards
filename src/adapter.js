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


export const adapter = createSlice({
    name: 'app',
    initialState: {
        initialViewComplete: false,
        vw: window.innerWidth,
        vh: window.innerHeight,
        cw: window.innerWidth,
        ch: window.innerHeight,
        language: navigator.language.slice(0, 2)
    },
    reducers: {
        resize: (state, action) => {
            const { width, height } = action.payload;
            state.initialViewComplete = true;
            state.vw = width;
            state.vh = height;
        }
    }
});

export const { resize } = adapter.actions;

export const viewportSize = state => ({
    vw: state.harbor.vw,
    vh: state.harbor.vh
});

export const contentSize = state => ({
    cw: state.harbor.cw,
    ch: state.harbor.ch
});

export default adapter.reducer;
