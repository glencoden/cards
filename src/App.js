import { useReducer, useState, useCallback } from 'react';
import { cardDeck, CardPriority } from './js/CardDeck';
import { makeStyles, Card, CardContent, CardActions, Typography, Button, IconButton, Fab, TextField } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';


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
            return { ...state, card: action.card, cardTurned: action.cardTurned };
        case ActionTypes.TURN_CARD:
            return { ...state, cardTurned: !state.cardTurned };
        default:
            return { ...state };
    }
};


// ui

const useStyles = makeStyles(theme => ({
    root: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        display: 'grid',
        gridTemplateRows: 'auto 112px',
        backgroundColor: theme.palette.grey['100']
    },
    card: {
        width: '330px',
        justifySelf: 'center',
        alignSelf: 'center',
        overflow: 'visible'
    },
    cardContent: {
        position: 'relative',
        height: '190px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    translations: {
        fontSize: '24px',
        textAlign: 'center'
    },
    example: {
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '10px'
    },
    cardActions: {
        position: 'absolute',
        bottom: '-72px',
        display: 'flex',
        justifyContent: 'center'
    },
    rankButton: {
        margin: '0 16px'
    },
    rbFresh: {
        backgroundColor: theme.palette.error.dark
    },
    rbHigh: {
        backgroundColor: theme.palette.warning.main
    },
    rbMedium: {
        backgroundColor: theme.palette.success.main
    },
    rbLow: {
        backgroundColor: theme.palette.info.light
    },
    showOrderSwitch: {
        alignSelf: 'center',
        justifySelf: 'start',
        marginLeft: '28px'
    },
    speedDial: {
        position: 'fixed',
        right: '28px',
        bottom: '28px'
    },
    login: {
        width: '200px',
        height: '150px',
        justifySelf: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    editor: {
        width: '330px',
        justifySelf: 'center',
        alignSelf: 'center',
    },
    editorActions: {
        width: '210px',
        justifySelf: 'center',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const CardShowOrder = {
    A_TO_B: 'a-to-b',
    B_TO_A: 'b-to-a',
    RANDOM: 'random'
};


function App() {
    const classes = useStyles();
    const [ state, dispatch ] = useReducer(reducer, initState);

    const [ loginInput, setLoginInput ] = useState('');
    const [ cardSeen, setCardSeen ] = useState(false);
    const [ showOrder, setShowOrder ] = useState(CardShowOrder.A_TO_B);
    const [ speedDialOpen, setSpeedDialOpen ] = useState(false);
    const [ stageDelete, setStageDelete ] = useState(false);
    const [ cardForEdit, setCardForEdit ] = useState(null);

    const getActiveCard = useCallback(
        () => {
            setCardSeen(false);
            let cardTurned = false;
            if (showOrder === CardShowOrder.B_TO_A) {
                cardTurned = true;
            } else if (showOrder === CardShowOrder.RANDOM) {
                cardTurned = Math.random() < 0.5;
            }
            cardDeck.getActiveCard()
                .then(card => dispatch({ card, cardTurned, type: ActionTypes.SET_CARD }))
                .catch(err => {
                    console.log(err);
                    dispatch({ card: null, type: ActionTypes.SET_CARD })
                });
        },
        [ dispatch, showOrder ]
    );

    const rankCard = useCallback(
        (event, id, priority) => {
            event.stopPropagation();
            cardDeck.rankCard(id, priority)
                .then(getActiveCard);
        },
        [ getActiveCard ]
    );

    let cardActions = null;

    if (stageDelete) {
        cardActions = (
            <>
                <Button
                    key="clear"
                    variant="contained"
                    onClick={event => {
                        event.stopPropagation();
                        setStageDelete(false);
                    }}
                >
                    <span className="material-icons">clear</span>
                </Button>
                <Button
                    key="delete"
                    variant="contained"
                    color="secondary"
                    onClick={e => {
                        e.stopPropagation();
                        cardDeck.deleteCard(state.card.id)
                            .then(() => {
                                setStageDelete(false);
                                getActiveCard();
                            });
                    }}
                >
                    <span className="material-icons">delete</span>
                </Button>
            </>
        );
    } else if (cardSeen) {
        cardActions = (
            <>
                <Fab key="rb-fresh" className={`${classes.rankButton} ${classes.rbFresh}`} size="small" onClick={event => rankCard(event, state.card.id, CardPriority.FRESH)} />
                <Fab key="rb-high" className={`${classes.rankButton} ${classes.rbHigh}`} size="small" onClick={event => rankCard(event, state.card.id, CardPriority.HIGH)} />
                <Fab key="rb-medium" className={`${classes.rankButton} ${classes.rbMedium}`} size="small" onClick={event => rankCard(event, state.card.id, CardPriority.MEDIUM)} />
                <Fab key="rb-low" className={`${classes.rankButton} ${classes.rbLow}`} size="small" onClick={event => rankCard(event, state.card.id, CardPriority.LOW)} />
            </>
        );
    }

    if (!state.user) {
        return (
            <div className={classes.root}>
                <div className={classes.login}>
                    <TextField
                        id="username"
                        label="Name"
                        margin="normal"
                        value={loginInput}
                        onChange={event => setLoginInput(event.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            cardDeck.init(loginInput)
                                .then(user => dispatch({ type: ActionTypes.SET_USER, user }))
                                .then(getActiveCard)
                                .catch(err => console.log(err));
                        }}
                    >
                        Fertig
                    </Button>
                </div>
            </div>
        );
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
                            cardDeck.updateCard(cardForEdit)
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

    console.log('APP', state.card);// TODO remove dev code

    return (
        <div className={classes.root}>
            <Card
                className={classes.card}
                onClick={() => {
                    dispatch({ type: ActionTypes.TURN_CARD });
                    setCardSeen(true);
                }}
            >
                {state.card && (
                    <CardContent className={classes.cardContent}>
                        {Object.values(state.cardTurned ? state.card.translations.to : state.card.translations.from).map((entry, index) => {
                            if (!entry) {
                                return null;
                            }
                            return (
                                <Typography
                                    key={index}
                                    className={classes.translations}
                                    variant="subtitle2"
                                >
                                    {entry}
                                </Typography>
                            );
                        })}
                        {state.cardTurned && state.card.example && (
                            <Typography
                                className={classes.example}
                                variant="caption"
                            >
                                {state.card.example}
                            </Typography>
                        )}
                        <CardActions className={classes.cardActions}>
                            {cardActions}
                        </CardActions>
                    </CardContent>
                )}
            </Card>

            <div className={classes.showOrderSwitch}>
                <Typography variant="caption" color="textSecondary">A</Typography>
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
                <Typography variant="caption" color="textSecondary">B</Typography>
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
