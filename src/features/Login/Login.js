import { useState } from 'react';
import { useStyles } from '../../styles';
import { useDispatch } from 'react-redux';
import { login } from '../../adapter';
import { Button, TextField } from '@material-ui/core';


function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ userInput, setUserInput ] = useState('');

    return (
        <div className={classes.root}>
            <div className={classes.login}>
                <TextField
                    id="username"
                    label="Name"
                    margin="normal"
                    value={userInput}
                    onChange={event => setUserInput(event.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(login(userInput))}
                >
                    Fertig
                </Button>
            </div>
        </div>
    );
}

export default Login;