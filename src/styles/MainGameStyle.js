import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default EStyleSheet.create({

    /* MAIN-GAME */

    centerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainGameContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    topBarContainer: {
        flex: 1,
        width: '100%',
    },
    gameBodyContainer: {
        flex: 7,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        flex: 4,
        /*
        backgroundColor: 'gray',
        */
    },
    userGeneralProfileContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 30,
        flex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible'
    },
    userGeneralProfile: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 40,
        height: '100%',
    },
    userProfileText: {
        width: '100%',
        height: '100%',
        paddingTop: 45,
        display: 'flex',
        alignItems: 'center',
    },
    winningDetails: {
        flex: 3,
        width: '90%',
        margin: 13,
        flexDirection: 'row',
    },
    userDetailsText: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userProfileImage: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 3,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 42.5,
    },
    gameGeneralProfile: {
        width: '100%',
        marginTop: 5,
        borderRadius: 20,
        flex: 2,
        backgroundColor: 'white',
    },



    bottomBarContainer: {
        flex: 1.5,
        width: '100%',
    },
    bottomButtView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        margin: '1.0rem',
        paddingVertical: '0.5rem',
        borderRadius: '1.1rem'
    },

    /* END MAIN-GAME */



    /* AUTH */
    registerContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '80%'
    },
    inputText: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        fontFamily: 'Assistant-Regular',
        fontSize: 19,
        color: '#bfbebe',
        borderBottomColor: '#d2d2d2',
        borderBottomWidth: 2,
    },
    /* END AUTH */



    /* GENERAL */
    coloredButton: {
        height: '3.5rem',
        borderRadius: '1.5rem',
    },
    /* END GENERAL */
});