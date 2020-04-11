import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import {mintgreen, purple, softblue, white} from './utils/colors'
import TabNav from './components/TabNav';
import DeckDetails from './components/DeckDetails';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';
import { setLocalNotification } from './utils/helpers';


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
    Decks: {
        screen: TabNav,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    DeckInfo: {
        screen: DeckDetails,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: softblue,
                shadowColor: 'transparent'
            }
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: softblue,
            }
        })
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: softblue,
            }
        })
    }
}));

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
        <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={softblue} barStyle="light-content" />
            <MainNavigator />
          </View>
        </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
