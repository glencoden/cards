import { useState, useCallback } from 'react';
import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { cardDeck, CardPriority } from './js/CardDeck';
import { Card, CardContent, CardActions, Typography, Button, IconButton, Fab, TextField } from '@material-ui/core';
import { Autocomplete, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';

import Login from './features/Login/Login';
import ActiveCard from './features/ActiveCard.js/ActiveCard';





function App() {
    const classes = useStyles();
    // const [ state, dispatch ] = useReducer(reducer, initState);
    const dispatch = useDispatch();
    const state = useSelector(state => state);


    const [ showSearch, setShowSearch ] = useState(false);
    const [ searchInput, setSearchInput ] = useState('');
    const [ showOrder, setShowOrder ] = useState(CardShowOrder.A_TO_B);
    const [ speedDialOpen, setSpeedDialOpen ] = useState(false);
    const [ cardForEdit, setCardForEdit ] = useState(null);

    if (!state.user) {
        return Login;
    }

    if (cardForEdit) {
        return (
            <div className={classes.root}>
                <div className={classes.editor}>
                    {Object.keys(cardForEdit.translations.from).map((entry, index) => (
                        <TextField
                            key={entry + index}
                            id={entry}
                            label={entry}
                            margin="normal"
                            value={cardForEdit.translations.from[entry]}
                            onChange={event => setCardForEdit(prevState => {
                                const curState = { ...prevState };
                                curState.translations.from[entry] = event.target.value;
                                return curState;
                            })}
                            fullWidth
                        />
                    ))}
                    {Object.keys(cardForEdit.translations.to).map((entry, index) => (
                        <TextField
                            key={entry + index}
                            id={entry}
                            label={entry}
                            margin="normal"
                            value={cardForEdit.translations.to[entry]}
                            onChange={event => setCardForEdit(prevState => {
                                const curState = { ...prevState };
                                curState.translations.to[entry] = event.target.value;
                                return curState;
                            })}
                            fullWidth
                        />
                    ))}
                    <TextField
                        id="example"
                        label="Beispiel"
                        margin="normal"
                        value={cardForEdit.example}
                        onChange={event => setCardForEdit(prevState => ({
                            ...prevState,
                            example: event.target.value
                        }))}
                        fullWidth
                    />
                </div>
                <div className={classes.editorActions}>
                    <Button
                        variant="contained"
                        onClick={() => setCardForEdit(null)}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            cardDeck.upsertCard(cardForEdit)
                                .then(card => {
                                    dispatch({ card, cardTurned: false, type: ActionTypes.SET_CARD })
                                    setCardForEdit(null);
                                    setCardSeen(false);
                                })
                        }}
                    >
                        Fertig
                    </Button>
                </div>
            </div>
        );
    }

    console.log('app render');// TODO remove dev code

    return (
        <div className={classes.root}>
            <IconButton className={classes.numCards}>
                <Typography variant="caption" color="textSecondary">{`${cardDeck.getNumCardsSeen()}/${cardDeck.getNumCards()}`}</Typography>
            </IconButton>
            <div className={classes.search}>
                {!showSearch && (
                    <IconButton onClick={() => setShowSearch(true)}>
                        <span className="material-icons">search</span>
                    </IconButton>
                )}
                {showSearch && (
                    <Autocomplete
                        className={classes.searchInput}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        inputValue={searchInput}
                        onInputChange={(event, value) => setSearchInput(value)}
                        onChange={(event, value) => {
                            const searchResultId = cardDeck.getIdBySearchItem(value);
                            if (!searchResultId) {
                                return;
                            }
                            getActiveCard(searchResultId);
                        }}
                        onBlur={() => {
                            setSearchInput('');
                            setShowSearch(false);
                        }}
                        options={cardDeck.getSearchItems()}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Suche"
                                variant="outlined"
                                autoFocus
                            />
                        )}
                    />
                )}
            </div>

            <ActiveCard />

            <div className={classes.showOrderSwitch}>
                <Typography variant="caption" color="textSecondary">{state.user?.from[0]}</Typography>
                <IconButton
                    onClick={() => setShowOrder(prevState => {
                        const values = Object.values(CardShowOrder);
                        return values[(values.indexOf(prevState) + 1) % 3]
                    })}
                >
                    {showOrder === CardShowOrder.A_TO_B && <span className="material-icons">arrow_right_alt</span>}
                    {showOrder === CardShowOrder.B_TO_A && <span className="material-icons" style={{ transform: 'rotate(180deg)' }}>arrow_right_alt</span>}
                    {showOrder === CardShowOrder.RANDOM && <span className="material-icons">swap_horiz</span>}
                </IconButton>
                <Typography variant="caption" color="textSecondary">{state.user?.to[0]}</Typography>
            </div>

            <SpeedDial
                className={classes.speedDial}
                ariaLabel="SpeedDial"
                hidden={false}
                icon={<SpeedDialIcon/>}
                onClose={() => setSpeedDialOpen(false)}
                onOpen={() => setSpeedDialOpen(true)}
                open={speedDialOpen}
                direction="up"
            >
                <SpeedDialAction
                    icon={<span className="material-icons">add</span>}
                    tooltipTitle="Neu"
                    onClick={() => {
                        setCardForEdit({
                            translations: {
                                from: state.user.from.reduce((r, e) => ({ ...r, [e]: '' }), {}),
                                to: state.user.to.reduce((r, e) => ({ ...r, [e]: '' }), {})
                            },
                            example: ''
                        });
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">edit</span>}
                    tooltipTitle="Bearbeiten"
                    onClick={() => {
                        if (state.card) {
                            setCardForEdit(state.card);
                        }
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">delete</span>}
                    tooltipTitle="Löschen"
                    onClick={() => {
                        if (state.card) {
                            setStageDelete(true);
                        }
                        setSpeedDialOpen(false);
                    }}
                />
            </SpeedDial>
        </div>
    );
}

export default App;
