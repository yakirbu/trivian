import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';


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
                                        <View style={textStyles.smallButt}>
                                            <Text style={[textStyles.smallHeader, { color: '#818181' }]}>משיכת כסף</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gameGeneralProfile}>
                        <Text style={styles.mainText}>Hi</Text>
                    </View>
                </View>

                <View style={styles.bottomBarContainer}>
                </View>
            </View>
        )
    }
}


export default GameDetails;