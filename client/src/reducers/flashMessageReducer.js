import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGE} from '../actionType';

const flashMessageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            state = [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
            break;
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state, {id: action.id});
            if(index >= 0) {
                state = [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            break;
        case DELETE_ALL_FLASH_MESSAGE:
            state = [];
            break;
        default:
            break;
    }
    return state;
}

export default flashMessageReducer;