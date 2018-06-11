import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import IconE from 'react-native-vector-icons/Entypo';

import { databaseHandler } from './DatabaseHandler';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';




class PageTemplate extends React.Component {

    componentDidMount() {

    }

    render() {
        return (

            <LinearGradient style={styles.mainGameContainer}
                colors={['#9e489d', '#8c4ece', '#644ddb']}>


                <View style={[styles.topBarContainer, { backgroundColor: this.props.topBarColor ? this.props.topBarColor : 'transparent' }]}>
                    <View style={[styles.mainGameContainer, styles.topBarContainerWrapper]}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={[styles.topBarLine]}>
                                <Text style={[textStyles.smallHeader, styles.topBarText]}>{"15"}</Text>
                            </View>
                            <IconE name="heart" style={[textStyles.bigText, { position: 'absolute' }]} color="#d83b2f" />
                        </View>

                    </View>
                </View>

                <View style={styles.gameBodyContainer}>
                    {this.props.children}
                </View>

            </LinearGradient>


        );
    }

}


export default PageTemplate;


