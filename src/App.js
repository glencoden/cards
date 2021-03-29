import { useReducer, useState, useCallback, useEffect } from 'react';
import { cardDeck, CardPriority } from './js/CardDeck';
import { makeStyles, Card, CardContent, CardActions, Typography, Button, Fab } from '@material-ui/core';
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
            return { ...state, card: action.card, cardTurned: false };
        case ActionTypes.TURN_CARD:
            return { ...state, cardTurned: true };
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
        alignSelf: 'center'
    },
    cardContent: {
        position: 'relative',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typography: {
        fontSize: '20px'
    },
    cardActions: {
        position: 'absolute',
        bottom: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    rankButton: {
        margin: '0 12px'
    },
    rbFresh: {
        backgroundColor: theme.palette.background.paper
    },
    rbHigh: {
        backgroundColor: theme.palette.error.dark
    },
    rbMedium: {
        backgroundColor: theme.palette.warning.light
    },
    rbLow: {
        backgroundColor: theme.palette.success.dark
    },
    speedDial: {
        position: 'fixed',
        right: '28px',
        bottom: '28px'
    }
}));

function App() {
    const classes = useStyles();
    const [ state, dispatch ] = useReducer(reducer, initState);

    const [ speedDialOpen, setSpeedDialOpen ] = useState(false);
    const [ stageDelete, setStageDelete ] = useState(false);

    const getActiveCard = useCallback(
        () => {
            cardDeck.getActiveCard()
                .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
                .catch(err => {
                    console.log(err);
                    dispatch({ card: null, type: ActionTypes.SET_CARD })
                });
        },
        [ dispatch ]
    );

    const rankCard = useCallback(
        (id, priority) => {
            cardDeck.rankCard(id, priority)
                .then(getActiveCard);
        },
        [ getActiveCard ]
    );

    useEffect(() => {
        cardDeck.init('meyer')
            .then(user => dispatch({ type: ActionTypes.SET_USER, user }))
            .then(() => cardDeck.getActiveCard())
            .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
            .catch(err => console.log(err));
    }, [ dispatch ]);

    let cardActions = null;

    if (stageDelete) {
        cardActions = (
            <>
                <Button
                    variant="contained"
                    onClick={e => {
                        e.stopPropagation();
                        setStageDelete(false);
                    }}
                >
                    <span className="material-icons">clear</span>
                </Button>
                <Button
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
    } else if (state.cardTurned) {
        cardActions = (
            <>
                <Fab className={`${classes.rankButton} ${classes.rbFresh}`} size="small" onClick={() => rankCard(state.card.id, CardPriority.FRESH)}>
                    <span className="material-icons">sync</span>
                </Fab>
                <Fab className={`${classes.rankButton} ${classes.rbHigh}`} size="small" onClick={() => rankCard(state.card.id, CardPriority.HIGH)} />
                <Fab className={`${classes.rankButton} ${classes.rbMedium}`} size="small" onClick={() => rankCard(state.card.id, CardPriority.MEDIUM)} />
                <Fab className={`${classes.rankButton} ${classes.rbLow}`} size="small" onClick={() => rankCard(state.card.id, CardPriority.LOW)} />
            </>
        );
    }

    return (
        <div className={classes.root}>
            <Card
                className={classes.card}
                onClick={() => {
                    if (!state.cardTurned) {
                        dispatch({ type: ActionTypes.TURN_CARD });
                        return;
                    }
                    getActiveCard();
                }}
            >
                {state.card && (
                    <CardContent className={classes.cardContent}>
                        {(state.cardTurned ? state.card.translations.to : state.card.translations.from).map((entry, index) => (
                            <Typography
                                key={index}
                                className={classes.typography}
                                variant="subtitle2"
                            >
                                {entry}
                            </Typography>
                        ))}
                        <CardActions className={classes.cardActions}>
                            {cardActions}
                        </CardActions>
                    </CardContent>
                )}
            </Card>

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
                        cardDeck.addCard({ from: [ 'Deutsch' ], to: [ 'Chinese', '汉语' ] }, 'glen was here')
                            .then(() => {
                                cardDeck.getActiveCard()
                                    .then(card => dispatch({ card, type: ActionTypes.SET_CARD }))
                                    .catch(err => console.error(err));
                            });
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">edit</span>}
                    tooltipTitle="Bearbeiten"
                    onClick={() => {
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">delete</span>}
                    tooltipTitle="Löschen"
                    onClick={() => {
                        setStageDelete(true);
                        setSpeedDialOpen(false);
                    }}
                />
            </SpeedDial>

            {/*<button
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
            </button>*/}
        </div>
    );
}

export default App;
