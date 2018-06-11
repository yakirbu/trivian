import React from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Progress from 'react-native-progress';

import EStyleSheet from 'react-native-extended-stylesheet';

import { databaseHandler } from './DatabaseHandler';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';

import PageTemplate from './PageTemplate';
import ColorButton from './ColorButton';



var that;
var currTime = 0;
var timer;
const QUESTION_TIME = 10;

class Game extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            openImage: '',
            image: true,
            timeProgress: 100,
            questionRunning: false,

            butt1: 0,
            butt2: 0,
            butt3: 0,
        }

    }


    controlImage(imgUrl) {
        that.setState({ openImage: imgUrl });
    }


    lockButtons(includesSelected) {
        if (includesSelected) {
            that.setState({
                butt1: 2,
                butt2: 2,
                butt3: 2
            })
        }
        else {
            that.setState({
                butt1: that.state.butt1 != 1 ? 2 : 1,
                butt2: that.state.butt2 != 1 ? 2 : 1,
                butt3: that.state.butt3 != 1 ? 2 : 1,
            })
        }
    }

    selectAnswer(num) {
        var currVal = that.state["butt" + num];
        if (currVal == 0 && that.state.questionRunning) {
            var obj = {};
            obj["butt" + num] = 1;
            that.setState(obj, () => that.lockButtons(false));
        }
    }

    resetButtons() {
        that.setState({
            butt1: 0,
            butt2: 0,
            butt3: 0
        })
    }


    endQuestion() {
        that.setState({ questionRunning: false });
        that.lockButtons(false);
    }


    calculateTime() {
        currTime += 100;
        var timeLeft = QUESTION_TIME - ((currTime - that.props.question.startTime) / 1000);

        if (timeLeft > 0) {
            that.setState({
                timeProgress: (timeLeft / QUESTION_TIME) * 10
            }, () => {
                if (true) {
                    //obj.innerHTML = Math.round(timeLeft);
                }
            })
        }
        else {
            //console.log("end!")
            that.setState({
                timeProgress: 0
            }, () => {
                if (true) {
                    //obj.innerHTML = Math.round(0);
                }
                clearInterval(that.timer);
                that.endQuestion();
            })
        }
    }

    start() {

        if (that.props.question.status == 'active') {
            var t0 = Date.now();
            databaseHandler.getTime((time) => {
                var t1 = Date.now();

                currTime = time - (t1 - t0);
                //Alert.alert(t1 + " " + (t1 - t0) + " " + currTime);
                //console.log((currTime - that.props.question.startTime) + " " + (QUESTION_TIME * 1000))
                if ((currTime - that.props.question.startTime) < (QUESTION_TIME * 1000)) {

                    that.setState({ questionRunning: true })
                    //there's timeleft for q
                    questionStarted = true;
                    that.resetButtons();
                    that.timer = setInterval(() => that.calculateTime(), 100);

                    var timeLeft = ((currTime - that.props.question.startTime) / 1000);
                    //console.log(timeLeft + " " + (timeLeft * 100));
                    if (timeLeft < QUESTION_TIME) {
                        /*
                        setTimeout(function () {
                            window.createjs.Sound.play("qStartSound", { startTime: (timeLeft * 100), duration: 11000 });
                        }, 50);
                        */
                    }
                }
            })

        }

    }


    componentDidMount() {
        this.start();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.question.status !== prevProps.question.status
            || this.props.question.startTime !== prevProps.question.startTime) {
            if (this.props.question.status == 'active') {
                //QUESTION STARTED
                this.start();
            }
            else {
                //QUESTION ENDED/HIDDEN
            }
        }
    }

    render() {
        if (!that.state.questionRunning
            && that.state.butt1 != 2
            && that.state.butt2 != 2
            && that.state.butt3 != 2) {
            that.lockButtons(false);
        }

        var imgTestUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQpGyNGeS-e1YW92cbhRFfEWna8TZN3IKdDsw1o07r8kJxLPlmQ";
        var rem = databaseHandler.getRem();

        return (
            <PageTemplate topBarColor={'gray'}>

                <View style={[styles.centerContent, styles.mainGameContainer, {}]}>


                    <View style={[styles.centerContent, { width: '100%', flex: 3 }]}>

                        {this.state.image && <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
                            <Image source={{ uri: imgTestUrl }} style={[{ flex: 1, resizeMode: 'cover' }]} />
                            <LinearGradient style={{ height: '100%', width: '100%', position: 'absolute' }} colors={['rgba(0,0,0,.1)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,1)']} />
                        </View>}

                        <View style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 10, width: '100%' }}>
                            <Image source={require('../images/curved.png')} style={[styles.curvedView, {}]} />
                        </View>


                        {this.props.question.status !== 'off' && <View style={[styles.questionContainer, styles.centerContent, { paddingBottom: (3.4 * rem) }]}>

                            {/* TIMER */}
                            <View style={[styles.smallTimerContainer, {}]}>
                                <Progress.Circle
                                    showsText={true}
                                    size={4 * rem}
                                    progress={this.state.timeProgress / 10}
                                    borderWidth={0}
                                    thickness={0.40 * rem}
                                    color={'#b54193'}
                                    unfilledColor={'#c8c0cb'}>

                                    <View style={[{ flex: 1, }, styles.centerContent]}>
                                        <Text style={[textStyles.header, textStyles.questionText, { fontSize: 1.5 * rem, flex: 1, textAlign: 'center', fontFamily: 'Rubik-Medium', color: 'white' }]}>
                                            {this.state.timeProgress != 100 ? this.state.timeProgress.toFixed(0) : 10}
                                        </Text>
                                    </View>
                                </Progress.Circle>
                            </View>

                            <Text style={[textStyles.header, { color: 'white', fontFamily: 'Rubik-Bold' }]}>
                                {"שאלה " + this.props.question.num}
                            </Text>

                            <Text style={[textStyles.header, textStyles.questionText, { textAlign: 'center', fontFamily: 'Rubik-Regular', color: 'white' }]}>
                                {this.props.question.question}
                            </Text>

                            {/* IMAGE-QUESTION

                            {!this.state.image && <View>
                                {this.state.openImage === '' ?
                                    <TouchableOpacity onPress={() => this.controlImage(imgTestUrl)}>
                                        <Image source={{ uri: imgTestUrl }} style={[styles.questionImage, {}]} />
                                    </TouchableOpacity>
                                    :
                                    <Modal visible={true} transparent={true}>
                                        <ImageViewer
                                            onCancel={() => this.controlImage('')}
                                            onClick={(onCancel) => { onCancel() }}
                                            imageUrls={[{ url: this.state.openImage }]} />
                                    </Modal>
                                }
                            </View>} */}


                        </View>}

                    </View>

                    <View style={[{ width: '100%', flex: 2, backgroundColor: 'white' }, styles.centerContent]}>
                        {this.props.question.status !== 'off' && <View style={[styles.centerContent, { flex: 1, width: '80%', marginTop: (0.5 * rem), justifyContent: 'flex-start' }]}>
                            <ColorButton
                                style={{ marginTop: 6, width: '80%' }}
                                colors={['#c64d9e', '#7a4be5']}
                                method={() => this.selectAnswer(1)}
                                text={this.props.question.option1}
                                id={"1"}
                                type={this.state.butt1} />
                            <ColorButton
                                style={{ marginTop: 6, width: '80%' }}
                                colors={['#c64d9e', '#7a4be5']}
                                method={() => this.selectAnswer(2)}
                                text={this.props.question.option2}
                                id={"2"}
                                type={this.state.butt2} />
                            <ColorButton
                                style={{ marginTop: 6, width: '80%' }}
                                colors={['#c64d9e', '#7a4be5']}
                                method={() => this.selectAnswer(3)}
                                text={this.props.question.option3}
                                id={"3"}
                                type={this.state.butt3} />
                        </View>}
                    </View>
                </View>
            </PageTemplate>

        );
    }

}


export default Game;