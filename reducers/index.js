import {ADD_QUESTION, RECEIVE_DECKS, ADD_DECK} from '../actions/shared'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK :
            return {
                ...state,
                ...action.deck,
            };
        case ADD_QUESTION:
            const title = action.key;
            const question = action.object;
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title].questions].concat(question)
                }
            };
        default :
            return state
    }
}

export default decks
