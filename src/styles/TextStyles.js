import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    header: {
        color: '#5a34bd',
        fontFamily: 'Assistant-Bold',
        fontSize: '2rem',
    },
    smallHeader: {
        fontFamily: 'Assistant-Bold',
        color: 'black',
        fontSize: '1.4rem'
    },
    boldBig: {
        fontFamily: 'Assistant-Bold',
        color: '#d65390',
        fontSize: '3.5rem',
    },
    smallButt: {
        borderWidth: 1,
        borderColor: '#818181',
        paddingHorizontal: '1.4rem',
        paddingVertical: '0.2rem',
        borderRadius: '1.5rem',
        marginTop: '.5rem',
    },
    whiteBigHeader: {
        fontFamily: 'Assistant-Bold',
        color: 'white',
        fontSize: 40,
    },
    normalText: {
        fontFamily: 'Assistant-Regular',
        color: 'black',
        fontSize: 23,
    },
    realSmallText: {
        fontSize: '1.2rem',
    },
    smallText: {
        fontSize: '1.4rem',
    },
    bigText: {
        fontSize: '3rem',
    },
    questionText: {
        marginTop: '1.3rem',
    }
});