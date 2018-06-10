import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';


//COMPS
import { databases, auth, databaseHandler } from './DatabaseHandler';


import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';

var that;
class Auth extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            name: '',
            phone: '',
            code: '',
            confirmResult: '',
            loading: false,
        }
    }

    async authenticate() {
        console.warn("checking")
        if (that.state.phone.length === 10 && that.state.name.length > 1) {
            //save user name localy
            await AsyncStorage.setItem('username', that.state.name);

            //set loading true
            that.setState({ loading: true });

            //send confirmation msg to phone
            auth.signInWithPhoneNumber("+972" + that.state.phone)
                .then(confirmResult => {
                    that.setState({ loading: false, confirmResult: confirmResult });
                    console.warn("succ " + confirmRes)
                }) // save confirm result to use with the manual verification code)
                .catch(error => {
                    console.warn(error);
                    that.setState({ loading: false });
                });
        }
        else {
            console.warn("You need to type phone-number & name");
        }
    }

    verifyCode() {
        let { confirmResult, code } = that.state;
        if (confirmResult && code.length > 1) {
            that.setState({ loading: true });
            confirmResult.confirm(code)
                .then(user => {
                    that.setState({ loading: false });
                    console.warn(user);
                }) // User is logged in){
                .catch(error => {
                    that.setState({ loading: false });
                    console.warn(error);
                }) // Error with verification code);
        }
        else {
            console.warn("יש להזין קוד")
        }
    }


    render() {
        let { name, phone, code } = this.state;

        return (
            <LinearGradient style={styles.mainGameContainer} colors={['#9e489d', '#8c4ece', '#644ddb']}>
                <View style={[styles.centerContent, { flex: 1, justifyContent: 'flex-end', paddingBottom: 15 }]}>
                    <Text style={textStyles.whiteBigHeader}>הרשמה</Text>
                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 5, backgroundColor: 'white' }}>

                    {this.state.loading &&
                        <Progress.Circle size={40}
                            style={{ position: 'absolute', zIndex: 10 }}
                            color={'#c64d9e'} borderWidth={4} indeterminate={true} />}

                    {/*<View style={{ width: '100%', backgroundColor: '#984aaf', height: 40, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} />*/}

                    {this.state.confirmResult === '' ? this.renderRegister() : this.renderVerify()}


                </View>
            </LinearGradient>
        )
    }





    renderVerify() {
        //console.warn(that.state.code + " " + that.state.name + " " + that.state.phone);
        return (
            <KeyboardAvoidingView style={styles.registerContainer}>


                <Text style={[textStyles.normalText, { textAlign: 'center', paddingTop: 30, paddingBottom: 10, fontFamily: 'assistantBold', color: '#9b9b9b', fontSize: 20 }]}>
                    הזן את הקוד שנשלח אליך כהודעה
                </Text>


                <View style={{ width: '100%', marginTop: 25 }}>
                    <Text style={[textStyles.smallHeader, { alignSelf: 'flex-end' }]}>קוד</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(code) => this.setState({ code: code })}
                        textAlign={'right'}
                        placeholder='הזן את הקוד'
                        clearButtonMode='while-editing'
                        maxLength={10}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.state.code}
                    />
                </View>


                <TouchableOpacity style={[styles.centerContent, styles.coloredButton, { marginTop: 15, width: '80%' }]} onPress={this.props.startGame()}>
                    <LinearGradient style={[styles.centerContent, styles.coloredButton, { width: '100%', height: '100%' }]} colors={['#c64d9e', '#7a4be5']} start={{ x: 0.0, y: 0.50 }} end={{ x: 1.0, y: 0.50 }}>
                        <Text style={[textStyles.smallHeader, { textAlign: 'center', color: 'white' }]}>אמת</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }



    renderRegister() {
        return (
            <KeyboardAvoidingView style={styles.registerContainer}>


                <Text style={[textStyles.normalText, { textAlign: 'center', paddingTop: 30, paddingBottom: 10, fontFamily: 'assistantBold', color: '#9b9b9b', fontSize: 20 }]}>
                    הזן את פרטיך והחל לשחק כעת
                        </Text>


                <View style={{ width: '100%', marginTop: 25 }}>
                    <Text style={[textStyles.smallHeader, { alignSelf: 'flex-end' }]}>שם</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(name) => this.setState({ name: name })}
                        textAlign={'right'}
                        placeholder='הזן את שמך'
                        clearButtonMode='while-editing'
                        maxLength={30}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.state.name}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                </View>

                <View style={{ width: '100%', marginVertical: 25 }}>
                    <Text style={[textStyles.smallHeader, { alignSelf: 'flex-end' }]}>מספר פלאפון</Text>
                    <TextInput
                        ref={(input) => { this.secondTextInput = input; }}
                        style={styles.inputText}
                        onChangeText={(phone) => this.setState({ phone: phone })}
                        textAlign={'right'}
                        placeholder='מספר בעל 10 ספרות'
                        clearButtonMode='while-editing'
                        maxLength={10}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.state.phone}
                    />
                </View>

                <TouchableOpacity style={[styles.centerContent, styles.coloredButton, { marginTop: 15, width: '80%' }]} onPress={this.props.startGame()}>
                    <LinearGradient style={[styles.centerContent, styles.coloredButton, { width: '100%', height: '100%' }]} colors={['#c64d9e', '#7a4be5']} start={{ x: 0.0, y: 0.50 }} end={{ x: 1.0, y: 0.50 }}>
                        <Text style={[textStyles.smallHeader, { textAlign: 'center', color: 'white' }]}>הבא</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }

}

export default Auth;