// import { Button, TextField } from '@material-ui/core';
// import { cardDeck } from '../../js/CardDeck';
//
//
// function Editor() {
//     return (
//         <div className={classes.root}>
//             <div className={classes.editor}>
//                 {Object.keys(cardForEdit.translations.from).map((entry, index) => (
//                     <TextField
//                         key={entry + index}
//                         id={entry}
//                         label={entry}
//                         margin="normal"
//                         value={cardForEdit.translations.from[entry]}
//                         onChange={event => setCardForEdit(prevState => {
//                             const curState = { ...prevState };
//                             curState.translations.from[entry] = event.target.value;
//                             return curState;
//                         })}
//                         fullWidth
//                     />
//                 ))}
//                 {Object.keys(cardForEdit.translations.to).map((entry, index) => (
//                     <TextField
//                         key={entry + index}
//                         id={entry}
//                         label={entry}
//                         margin="normal"
//                         value={cardForEdit.translations.to[entry]}
//                         onChange={event => setCardForEdit(prevState => {
//                             const curState = { ...prevState };
//                             curState.translations.to[entry] = event.target.value;
//                             return curState;
//                         })}
//                         fullWidth
//                     />
//                 ))}
//                 <TextField
//                     id="example"
//                     label="Beispiel"
//                     margin="normal"
//                     value={cardForEdit.example}
//                     onChange={event => setCardForEdit(prevState => ({
//                         ...prevState,
//                         example: event.target.value
//                     }))}
//                     fullWidth
//                 />
//             </div>
//             <div className={classes.editorActions}>
//                 <Button
//                     variant="contained"
//                     onClick={() => setCardForEdit(null)}
//                 >
//                     Abbrechen
//                 </Button>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => {
//                         cardDeck.upsertCard(cardForEdit)
//                             .then(card => {
//                                 dispatch({ card, cardTurned: false, type: ActionTypes.SET_CARD })
//                                 setCardForEdit(null);
//                                 setCardSeen(false);
//                             })
//                     }}
//                 >
//                     Fertig
//                 </Button>
//             </div>
//         </div>
//     );
// }
//
// export default Editor;