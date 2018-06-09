import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';
import { auth, DatabaseHandler } from './DatabaseHandler';



class GameDetails extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            fixSizeStyle: 0,
        }
    }


    find_dimesions(layout) {
        if (that.state.fixSizeStyle !== 0)
            return;
        else {
            const { x, y, width, height } = layout;
            that.setState({
                fixSizeStyle: height - 40,
            })
        }
        //console.warn(height);
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.profileContainer}>
                    <View style={styles.userGeneralProfileContainer}>
                        <View style={styles.userProfileImage}>
                            <Image style={{ height: 70, width: 70, marginTop: 0 }} source={require('../images/user.png')} />
                        </View>

                        <View style={[styles.userGeneralProfile, { height: this.state.fixSizeStyle === 0 ? '100%' : this.state.fixSizeStyle }]}
                            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
                            <View style={styles.userProfileText}>
                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                    <Text style={textStyles.header}>{this.props.user.name}</Text>
                                </View>
                                <View style={styles.winningDetails}>
                                    <View style={[styles.userDetailsText]}>
                                        <Text style={textStyles.smallHeader}>סה"כ זכיות</Text>
                                        <Text style={textStyles.boldBig}>12</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: '#d4d0d0', height: '70%', alignSelf: 'center' }} />
                                    <View style={[styles.userDetailsText]}>
                                        <Text style={textStyles.smallHeader}>יתרה כוללת</Text>
                                        <Text style={textStyles.boldBig}>₪{this.props.user.money}</Text>
                                        <TouchableOpacity onPress={() => auth.signOut()} style={textStyles.smallButt}>
                                            <Text style={[textStyles.smallHeader, { color: '#818181' }]}>משיכת כסף</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gameGeneralProfile}>
                        <View style={[styles.mainGameContainer, styles.centerContent]}>
                            <View style={[styles.centerContent, { flex: 1.5, justifyContent: 'flex-end' }]}>
                                <Text style={[textStyles.header]}>{"המשחק הבא"}</Text>
                            </View>
                            <View style={{ flex: 3, display: 'flex', flexDirection: 'row' }}>
                                <View style={[{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }]}>
                                    <View style={{ marginRight: 15, display: 'flex', flexDirection: 'column' }}>
                                        <Text style={[textStyles.smallHeader, { textAlign: 'right', fontFamily: 'Assistant-Regular', fontSize: 14 }]}>{"יתקיים בתאריך:"}</Text>
                                        <Text style={[textStyles.boldBig, { textAlign: 'right', fontSize: 16 }]}>{this.props.general.gameDescription}</Text>
                                    </View>
                                    <Icon style={{}} name="ios-time" size={35} color="#b7b7b7" />
                                </View>
                                <View style={[{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                                    <View style={{ marginRight: 15, display: 'flex', flexDirection: 'column' }}>
                                        <Text style={[textStyles.smallHeader, { textAlign: 'right', fontFamily: 'Assistant-Regular', fontSize: 14 }]}>{"סכום הפרס:"}</Text>
                                        <Text style={[textStyles.boldBig, { textAlign: 'right', fontSize: 16 }]}>₪{this.props.general.bidAmount}</Text>
                                    </View>
                                    <Icon name="md-trophy" size={35} color="#b7b7b7" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomBarContainer}>
                </View>
            </View>
        )
    }
}


export default GameDetails;