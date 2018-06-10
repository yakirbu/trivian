import React from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

//import { Font } from 'expo';

import MainGame from './src/js/MainGame';
import { databaseHandler } from './src/js/DatabaseHandler';


export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    /*
    await Font.loadAsync({
      'assistantBold': require('./assets/fonts/Assistant-Bold.ttf'),
      'assistantRegular': require('./assets/fonts/Assistant-Regular.ttf'),

    });

    this.setState({ fontLoaded: true });
    */

    I18nManager.allowRTL(false);
    console.disableYellowBox = true;

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

