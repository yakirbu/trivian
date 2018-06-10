import React from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainGame from './src/js/MainGame';
import Payment from './src/js/Payment';
import { databaseHandler } from './src/js/DatabaseHandler';


export default class App extends React.Component {


  componentDidMount() {
    I18nManager.allowRTL(false);
    //console.disableYellowBox = true;
  }

  render() {
    return (
      <Home />
    );
  }

}

const Home = createStackNavigator(
  {
    Home: {
      screen: MainGame,
    },
    Payment: {
      screen: Payment,
    }
  },
  {
    portraitOnlyMode: true,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });


// app entry
EStyleSheet.build({
  $rem: databaseHandler.getRem()
});

