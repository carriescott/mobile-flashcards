import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

export const MOBILE_FlASHCARDS_KEY = 'MobileFlashCards:decks';

export function getMockData () {
    return decks;
}

// Get decks from AsyncStorage if no data exists in storage populate it with data from _DATA.js
export async function getDecks () {
    try {
        const data = await AsyncStorage.getItem(MOBILE_FlASHCARDS_KEY);
        if (!data) {
            AsyncStorage.setItem(MOBILE_FlASHCARDS_KEY, JSON.stringify(decks));
        }
        return data === null ? decks : JSON.parse(data);
    } catch (error) {
        console.log(error);
        // Error saving data
    }
}


export function getDeck () {
    return AsyncStorage.getItem(MOBILE_FlASHCARDS_KEY)
        .then(formatCalendarResults)
}

export function saveDeckTitle () {
    return AsyncStorage.getItem(MOBILE_FlASHCARDS_KEY)
        .then(formatCalendarResults)
}

export function addCardToDeck () {
    return AsyncStorage.getItem(MOBILE_FlASHCARDS_KEY)
        .then(formatCalendarResults)
}



