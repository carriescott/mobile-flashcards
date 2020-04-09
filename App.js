import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import {mintgreen, purple, softblue, white} from './utils/colors'
import TabNav from './components/TabNav';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Constants from 'expo-constants';
import EntryDetail from './components/EntryDetail';
// import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  }
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: ({navigation}) => ({
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     }
  //   })
  // }
}));

export default class App extends React.Component {

  componentDidMount() {
    // setLocalNotification()
  }

  render() {
    return (
        <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={softblue} barStyle="light-content" />
            <MainNavigator />
          </View>
        // <Provider store={createStore(reducer)}>
        //   {/*<View style={{flex: 1}}>*/}
        //   <View style={styles.container}>
        //     <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        //     <MainNavigator />
        //   </View>
        // </Provider>
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
