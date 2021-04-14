import { useCallback, useEffect } from 'react';
import { useStyles } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { CardSide, getActiveCard, deleteCard, turnCard, setStageDeleteId } from '../../adapter';
import { Button, CardActions, CardContent, Fab, Typography } from '@material-ui/core';
import { CardPriority } from '../../js/CardDeck';


function ActiveCard() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const activeCard = useSelector(state => state.activeCard);
    const showSide = useSelector(state => state.showSide);
    const hasBeenTurned = useSelector(state => state.hasBeenTurned);
    const stageDeleteId = useSelector(state => state.stageDeleteId);

    useEffect(() => {
        if (activeCard) {
            return;
        }
        dispatch(getActiveCard());
    }, [ dispatch, activeCard ]);

    const rankCard = useCallback(
        (event, id, priority) => {},
        []
    );

    let cardActions = null;

    if (activeCard?.id === stageDeleteId) {
        cardActions = (
            <>
                <Button
                    key="clear"
                    variant="contained"
                    onClick={event => {
                        event.stopPropagation();
                        dispatch(setStageDeleteId(0))
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
                        dispatch(deleteCard(stageDeleteId));
                    }}
                >
                    <span className="material-icons">delete</span>
                </Button>
            </>
        );
    } else if (hasBeenTurned) {
        cardActions = (
            <>
                <Fab key="rb-fresh" className={`${classes.rankButton} ${classes.rbFresh}`} size="small" onClick={event => rankCard(event, activeCard.id, CardPriority.FRESH)} />
                <Fab key="rb-high" className={`${classes.rankButton} ${classes.rbHigh}`} size="small" onClick={event => rankCard(event, activeCard.id, CardPriority.HIGH)} />
                <Fab key="rb-medium" className={`${classes.rankButton} ${classes.rbMedium}`} size="small" onClick={event => rankCard(event, activeCard.id, CardPriority.MEDIUM)} />
                <Fab key="rb-low" className={`${classes.rankButton} ${classes.rbLow}`} size="small" onClick={event => rankCard(event, activeCard.id, CardPriority.LOW)} />
            </>
        );
    }

    return (
        <ActiveCard
            className={classes.card}
            onClick={() => dispatch(turnCard())}
        >
            {activeCard && (
                <CardContent className={classes.cardContent}>
                    {Object.values(showSide === CardSide.A ? activeCard.translations.to : activeCard.translations.from).map((entry, index) => {
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
                    {showSide === CardSide.B && activeCard.example && (
                        <Typography
                            className={classes.example}
                            variant="caption"
                        >
                            {activeCard.example}
                        </Typography>
                    )}
                    <CardActions className={classes.cardActions}>
                        {cardActions}
                    </CardActions>
                </CardContent>
            )}
        </ActiveCard>
    );
}

export default ActiveCard;