import React from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';
import { createStackNavigator } from 'react-navigation';
//import { Font } from 'expo';

import MainGame from './src/js/MainGame';

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
