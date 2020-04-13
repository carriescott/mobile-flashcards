import React from 'react';
import Constants from 'expo-constants';
import { View, StatusBar } from 'react-native';
import { softblue, white } from './utils/colors'
import { createStore } from 'redux';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';
import TabNav from './components/TabNav';
import DeckDetails from './components/DeckDetails';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';


function FlashCardStatusBar ({backgroundColor, ...props}) {
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
            title: 'Flash Cards',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: softblue,
            }
        }),
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: softblue,
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
            <FlashCardStatusBar backgroundColor={softblue} barStyle="light-content" />
            <MainNavigator />
          </View>
        </Provider>
    );
  }
}

