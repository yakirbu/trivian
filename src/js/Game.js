import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { databaseHandler } from './DatabaseHandler';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/MainGameStyle';


class Game extends React.Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={[styles.centerContent, styles.mainGameContainer, {}]}>
                <LinearGradient style={{ width: '100%', flex: 2 }}
                    colors={['#9e489d', '#644ddb']}>
                    <Text>hello</Text>

                </LinearGradient>
                <View style={[styles.curvedView, {}]} />
                <View style={{ flex: 3 }}>
                </View>
            </View>
        );
    }

}


export default Game;