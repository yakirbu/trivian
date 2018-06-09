import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


//COMPS
import { databases, auth, DatabaseHandler } from './DatabaseHandler';


import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';

var confirmRes;
var that;
class Auth extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            name: '',
            phone: '',
        }
    }

    authenticate() {
        console.warn("checking")
        if (that.state.phone.length === 10 && that.state.name.length > 1) {
            auth.signInWithPhoneNumber("+972" + that.state.phone)
                .then(confirmResult => {
                    confirmRes = confirmResult;
                    console.warn("succ " + confirmRes)
                }) // save confirm result to use with the manual verification code)
                .catch(error => console.warn(error));
        }
        else {
            console.warn("You need to type phone-number & name");
        }
    }

    verifyCode() {
        if (confirmRes) {
            confirmRes.confirm(verificationCode)
                .then(user => {
                    console.warn(user);
                }) // User is logged in){
                .catch(error => {
                    console.warn(error);
                }) // Error with verification code);
        }
    }

    render() {
        let { name, phone } = this.state;

        return (
            <LinearGradient style={styles.mainGameContainer} colors={['#9e489d', '#8c4ece', '#644ddb']}>
                <View style={[styles.centerContent, { flex: 1, justifyContent: 'flex-end', paddingBottom: 15 }]}>
                    <Text style={textStyles.whiteBigHeader}>הרשמה</Text>
                </View>
                <View style={{ display: 'flex', alignItems: 'center', flex: 5, backgroundColor: 'white' }}>

                    {/*<View style={{ width: '100%', backgroundColor: '#984aaf', height: 40, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} />*/}



                    <View style={styles.registerContainer}>


                        <Text style={[textStyles.normalText, { textAlign: 'center', paddingTop: 30, paddingBottom: 10, fontFamily: 'assistantBold', color: '#9b9b9b', fontSize: 20 }]}>הזן את פרטיך והחל לשחק כעת</Text>


                        <View style={{ width: '100%', marginTop: 25 }}>
                            <Text style={[textStyles.smallHeader, { alignSelf: 'flex-end' }]}>שם</Text>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ name: text })}
                                textAlign={'right'}
                                placeholder='הזן את שמך'
                                clearButtonMode='while-editing'
                                maxLength={30}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                        </View>

                        <View style={{ width: '100%', marginVertical: 25 }}>
                            <Text style={[textStyles.smallHeader, { alignSelf: 'flex-end' }]}>מספר פלאפון</Text>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => this.setState({ phone: text })}
                                textAlign={'right'}
                                placeholder='מספר בעל 10 ספרות'
                                clearButtonMode='while-editing'
                                maxLength={10}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                        </View>

                        <TouchableOpacity style={[styles.centerContent, { marginTop: 15, width: '80%', height: 40, borderRadius: 20 }]} onPress={() => this.authenticate()}>
                            <LinearGradient style={[styles.centerContent, { width: '100%', height: '100%', borderRadius: 20 }]} colors={['#c64d9e', '#7a4be5']} start={{ x: 0.0, y: 0.50 }} end={{ x: 1.0, y: 0.50 }}>
                                <Text style={[textStyles.smallHeader, { textAlign: 'center', color: 'white', fontSize: 20 }]}>הבא</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
            </LinearGradient>
        )
    }
}

export default Auth;