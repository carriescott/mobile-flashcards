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
    }
}

export function getDeck (title) {
    return getDecks().then((decks) => decks[title])
}

export function saveDeckTitle (deckObject) {
    AsyncStorage.mergeItem(MOBILE_FlASHCARDS_KEY, JSON.stringify(deckObject));
}

export function addCardToDeck (title, object ) {
    getDeck(title)
        //use the returned value from getDeck to update AsynStorage
        .then((deck) => {
        deck.questions.push(object);
        AsyncStorage.mergeItem(MOBILE_FlASHCARDS_KEY, JSON.stringify({
            [title]:deck
        }));
    });
}





