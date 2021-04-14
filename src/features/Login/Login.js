import { useState } from 'react';
import { useStyles } from '../../styles';
import { cardDeck } from '../../js/CardDeck';
import { Button, TextField } from '@material-ui/core';


function Login() {
    const classes = useStyles();
    const [ loginInput, setLoginInput ] = useState('');
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

export default Login;