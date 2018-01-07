import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actionType';

const authReducer = (state = {
    isAuthenticate: false,
}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            state = {
                isAuthenticate: !isEmpty(action.user),
                user: action.user
            };
            break;
        default:
            break;
    }
    return state;
}

export default authReducer;