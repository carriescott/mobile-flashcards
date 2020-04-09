import React from 'react';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import {mintgreen, purple, softblue, white} from '../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Decks from './Decks';
import NewDeck from './NewDeck';


const router = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <Ionicons name="ios-bookmarks" size={30} color={tintColor} />,
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <FontAwesome name="plus-square" size={30} color={tintColor} />,
        },
    },
};

const navigationOptions = {
    tabBarOptions: {
        showIcon: true,
        activeTintColor: Platform.OS === 'ios' ? softblue : white,
        style: {
            padding: 10,
            height: Platform.OS === 'ios' ? 60 : 'auto',
            fontSize: 18,
            backgroundColor: Platform.OS === 'ios' ? white : softblue,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        },
    },
};

const TabNav =
    Platform.OS === 'ios'
        ? createBottomTabNavigator(router, navigationOptions)
        : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(TabNav);