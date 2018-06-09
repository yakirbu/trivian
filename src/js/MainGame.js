import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ViewOverflow from 'react-native-view-overflow';
import * as Progress from 'react-native-progress';


//COMPS
import { auth, database, DatabaseHandler } from './DatabaseHandler';
import GameDetails from './GameDetails';
import Auth from './Auth';


import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';

var that;
var regCounter = 0;
export default class MainGame extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            loading: true,
            general: {},
            user: {},
            currentGame: {},
            currentQuestion: {},
            currQuestionData: {},
            startGame: false,
        }
    }



    componentDidMount() {

        //listen to general changes
        DatabaseHandler.listen('/General', (general) => {
            this.setState({ general: general.val() });

            //listen to game changes
            DatabaseHandler.listen('/Games/' + general.val().currentGame, (game) => {
                this.setState({
                    currentGame: game.val(),
                    startGame: game.val().status !== 'active',
                });

                console.warn(game.val());
                console.log("currentQuestion in game is now: " + game.val().currentQuestionId);

                //listen to current question changes
                DatabaseHandler.listen('/Questions/' + game.key + "/" + game.val().currentQuestionId, (question) => {
                    console.log("question-" + question.key)

                    //getting current question data once
                    if (question.val().status == "results") {
                        DatabaseHandler.getDataOnce(["QuestionData", question.key], (qData) => {
                            console.log("questionDataOnce-" + question.key)
                            this.setState({ currQuestionData: qData.val() }, () => {
                                this.setState({ currentQuestion: question.val() });
                            });
                        });
                    }
                    else
                        this.setState({ currentQuestion: question.val() });

                }, "question");
            });

        });


        that.listenToAuth();

    }


    getGuestView() {
        if (that.state.startGame) {
            return <View></View>
        }
        else {
            return <GameDetails user={that.state.user} />
        }
    }

    getMainView() {
        if (that.state.loading) {
            <LinearGradient style={styles.mainGameContainer}
                colors={['#9e489d', '#8c4ece', '#644ddb']}>
                <Progress.Circle size={40} color={'white'} borderWidth={4} indeterminate={true} />
            </LinearGradient>
        }
        else if (that.state.user.createdAt === undefined) {
            return <Auth setUser={(u) => that.setUser(u)} />;
        }
        else {
            return (
                <LinearGradient style={styles.mainGameContainer}
                    colors={['#9e489d', '#8c4ece', '#644ddb']}>


                    <View style={styles.topBarContainer}>
                    </View>

                    <View style={styles.gameBodyContainer}>
                        {that.getGuestView()}
                    </View>

                </LinearGradient>)
        }
    }



    async verifyUser(phone) {
        DatabaseHandler.getDataOnceWhere(["Users"], ["phone", phone], async (childSnapshot) => {
            if (childSnapshot) {
                //already verified

                console.warn("verified " + childSnapshot.key);

                DatabaseHandler.listen("Users/" + childSnapshot.key, (us) => {
                    that.setState({
                        loading: false,
                        verified: true,
                        user: us.val(),
                    }, () => {
                        console.warn(us);
                    })

                })

            }
            else {
                console.warn("unverified");
                const name = await AsyncStorage.getItem('username');
                if (name !== null) {
                    if (regCounter > 5)
                        return;
                    regCounter++;
                    DatabaseHandler.createNewUser(phone, name, (succ) => {
                        that.verifyUser(phone);
                    });
                }
                else {
                    auth.signOut();
                }

            }

        });
    }



    listenToAuth() {

        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.warn("logged-in!");
                var userPhone = "0" + user.phoneNumber.replace("+972", "");
                console.warn(userPhone);

                that.verifyUser(userPhone);


                console.log("logged in " + user.phoneNumber);
            } else {
                // User is signed out.
                // ...
                that.setState({ user: {}, loading: false });
                console.warn("user logged out")
            }

        });
    }



    setUser(user) {
        that.setState({
            user: user
        })
    }

    render() {
        return (

            <View style={styles.mainGameContainer}>
                {this.getMainView()}
            </View>

        );
    }
}

