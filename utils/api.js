import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

export const MOBILE_FlASHCARDS_KEY = 'MobileFlashCards:decks';

export async function getDecks () {
    try {
        const data = await AsyncStorage.getItem(MOBILE_FlASHCARDS_KEY);
        if (!data) {
            AsyncStorage.setItem(MOBILE_FlASHCARDS_KEY, JSON.stringify(decks));
        }
        return data === null ? decks : JSON.parse(data);
    } catch (error) {
    }
}

export function getDeck (title) {
    return getDecks()
        .then((decks) => decks[title]);
}

export function saveDeckTitle (deckObject) {
    AsyncStorage.mergeItem(MOBILE_FlASHCARDS_KEY, JSON.stringify(deckObject));
}

export function addCardToDeck (title, object ) {
    getDeck(title)
        .then((deck) => {
        deck.questions.push(object);
        AsyncStorage.mergeItem(MOBILE_FlASHCARDS_KEY, JSON.stringify({
            [title]:deck
        }));
    });
}





