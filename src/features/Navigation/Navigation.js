import { useState } from 'react';
import { useStyles } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { CardShowOrder, incrementShowOrder, setStageDeleteId } from '../../adapter';
import { IconButton, Typography } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';


function Navigation() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const showOrder = useSelector(state => state.showOrder);

    const [ speedDialOpen, setSpeedDialOpen ] = useState(false);

    return (
        <>
            <div className={classes.showOrderSwitch}>
                <Typography variant="caption" color="textSecondary">{user?.from[0]}</Typography>
                <IconButton
                    onClick={() => dispatch(incrementShowOrder())}
                >
                    {showOrder === CardShowOrder.A_TO_B && <span className="material-icons">arrow_right_alt</span>}
                    {showOrder === CardShowOrder.B_TO_A && <span className="material-icons" style={{ transform: 'rotate(180deg)' }}>arrow_right_alt</span>}
                    {showOrder === CardShowOrder.RANDOM && <span className="material-icons">swap_horiz</span>}
                </IconButton>
                <Typography variant="caption" color="textSecondary">{user?.to[0]}</Typography>
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
                        // setCardForEdit({
                        //     translations: {
                        //         from: state.user.from.reduce((r, e) => ({ ...r, [e]: '' }), {}),
                        //         to: state.user.to.reduce((r, e) => ({ ...r, [e]: '' }), {})
                        //     },
                        //     example: ''
                        // });
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">edit</span>}
                    tooltipTitle="Bearbeiten"
                    onClick={() => {
                        // if (state.card) {
                        //     setCardForEdit(state.card);
                        // }
                        setSpeedDialOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<span className="material-icons">delete</span>}
                    tooltipTitle="Löschen"
                    onClick={() => {
                        dispatch(setStageDeleteId());
                        setSpeedDialOpen(false);
                    }}
                />
            </SpeedDial>
        </>
    );
}

export default Navigation;