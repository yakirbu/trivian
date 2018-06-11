import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import IconE from 'react-native-vector-icons/Entypo';

import { databaseHandler } from './DatabaseHandler';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/MainGameStyle';
import textStyles from '../styles/TextStyles';




class ColorButton extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidUpdate(prevProps) {
        /*
        if (this.props.type) {
            this.setState({})
        }
        */
    }

    handleButt(type) {
        switch (type) {
            case 0:

                break;
        }
    }

    componentDidMount() {

    }

    render() {
        var fixedStyle = {};
        var buttonColors = this.props.colors;
        var textColor = 'white';
        var textWeight = "Bold";
        console.log("here0 " + this.props.type);
        if (this.props.type !== undefined) {
            console.log("here1");
            switch (this.props.type) {
                case 0:
                    fixedStyle = { borderWidth: (0.08 * databaseHandler.getRem()), borderColor: '#bfbfbf' };
                    buttonColors = ["white", "white"];
                    textColor = '#a9a9a9';
                    var textWeight = "Regular";
                    break;
                case 1:

                    break;
            }
        }

        return (

            <TouchableOpacity style={[styles.centerContent, styles.coloredButton, this.props.style ? this.props.style : {}]} onPress={() => this.props.method()}>
                <LinearGradient style={[styles.centerContent, styles.coloredButton, { width: '100%', height: '100%' }, fixedStyle]} colors={buttonColors} start={{ x: 0.0, y: 0.50 }} end={{ x: 1.0, y: 0.50 }}>
                    <Text style={[textStyles.smallHeader, { textAlign: 'center', color: textColor, fontFamily: 'Assistant-' + textWeight }]}>{this.props.text}</Text>
                </LinearGradient>
            </TouchableOpacity>


        );
    }

}


export default ColorButton;


