import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DatabaseHandler } from './DatabaseHandler';


var that;
class HighScore extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {

        }
    }

    componentDidMount(){
        this.getTopUsers();
    }

    getTopUsers() {
        DatabaseHandler.getSortedDataOnce("Users","points",(userData) => {
            var myJsonString = JSON.stringify(userData);
            console.log(myJsonString);
        });   
    }

    render() {
        return (
        
                <Text>HighScore UserInterface</Text>
          
        )
    }
}

export default HighScore;