import { useState } from 'react';
import { useStyles } from '../../styles';
import { useDispatch } from 'react-redux';
import { getActiveCard } from '../../adapter';
import { IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { cardDeck } from '../../js/CardDeck';


function Search() {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [ showSearch, setShowSearch ] = useState(false);
    const [ userInput, setUserInput ] = useState('');

    return (
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
                    inputValue={userInput}
                    onInputChange={(event, value) => setUserInput(value)}
                    onChange={(event, value) => {
                        const searchResultId = cardDeck.getIdBySearchItem(value);
                        if (!searchResultId) {
                            return;
                        }
                        dispatch(getActiveCard(searchResultId));
                    }}
                    onBlur={() => {
                        setUserInput('');
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
    );
}

export default Search;