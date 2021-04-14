import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
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
        backgroundColor: `${theme.palette.error.dark} !important`
    },
    rbHigh: {
        backgroundColor: `${theme.palette.warning.main} !important`
    },
    rbMedium: {
        backgroundColor: `${theme.palette.success.main} !important`
    },
    rbLow: {
        backgroundColor: `${theme.palette.info.light} !important`
    },
    numCards: {
        position: 'fixed',
        top: '16px',
        left: '16px'
    },
    search: {
        position: 'fixed',
        top: '16px',
        right: '16px'
    },
    searchInput: {
        width: '240px'
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