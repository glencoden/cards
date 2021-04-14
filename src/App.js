import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { Typography, IconButton } from '@material-ui/core';
import { cardDeck } from './js/CardDeck';

import Login from './features/Login/Login';
import Search from './features/Search/Search';
import ActiveCard from './features/ActiveCard.js/ActiveCard';
import Navigation from './features/Navigation/Navigation';


function App() {
    const classes = useStyles();
    const user = useSelector(state => state.user);

    if (!user) {
        return <Login />;
    }

    console.log('app render');// TODO remove dev code

    return (
        <div className={classes.root}>
            <IconButton className={classes.numCards}>
                <Typography variant="caption" color="textSecondary">{`${cardDeck.getNumCardsSeen()}/${cardDeck.getNumCards()}`}</Typography>
            </IconButton>

            <Search />
            <ActiveCard />
            <Navigation />
        </div>
    );
}

export default App;
