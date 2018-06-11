import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default EStyleSheet.create({

    /* MAIN-GAME */

    centerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainGameContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    //top-bar
    topBarContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        height: '4rem',

    },
    topBarContainerWrapper: {
        flexDirection: 'row',
        paddingRight: '0.4rem',
        paddingTop: '0.4rem',
        backgroundColor: 'transparent'
    },
    topBarLine: {
        backgroundColor: 'white',
        marginTop: '0.7rem',
        marginRight: '1.1rem',
        width: '7rem',
        height: '2rem',
        borderRadius: '1.5rem'
    },
    topBarText: {
        color: 'black',
        textAlign: 'center',
        marginRight: '0.8rem',
        fontFamily: 'Assistant-Bold'
    },
    //end top-bar
    gameBodyContainer: {
        flex: 9,
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
        borderRadius: '1.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: '3rem',
        height: '100%',
    },
    userProfileText: {
        width: '100%',
        height: '100%',
        paddingTop: '4rem',
        display: 'flex',
        alignItems: 'center',
    },
    userImgStyle: {
        height: '6rem',
        width: '6rem',
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
        padding: '.8rem',
        borderRadius: '6rem',
    },
    gameGeneralProfile: {
        width: '100%',
        marginTop: 5,
        borderRadius: '1.8rem',
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


    /* GAME */
    curvedView: {
        flex: 1,
        height: '3.4rem',
        width: '100%'
    },
    questionContainer: {
        height: '100%',
        width: '85%'
    },
    questionImage: {
        height: '15rem',
        width: '15rem',
        borderRadius: '1.5rem',
        marginVertical: '1.4rem'
    },
    timerContainer: {
        position: 'absolute',
        top: 0,

    },
    smallTimerContainer: {
        paddingVertical: '1.2rem',
    },
    /* END GAME */



    /* GENERAL */
    coloredButton: {
        height: '3.5rem',
        borderRadius: '1.5rem',
        width: '100%',
    },
    /* END GENERAL */
});