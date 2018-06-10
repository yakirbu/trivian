import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { databaseHandler } from './DatabaseHandler';


var that;
class Payment extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {

        }
    }

    componentDidMount() {
        
    }

  

    render() {
        return (
            <View>
            <Text>Payment UserInterface</Text>
            <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />  
          </View>  
        )
    }
}

export default Payment;