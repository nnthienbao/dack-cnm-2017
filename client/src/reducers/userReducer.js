import { SET_INFO_USER } from '../actionType';

const initalState = {
    info: {}
};
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_INFO_USER:
            state = {
                ...state,
                info: action.user
            };
            break;
        default:
            break;
    }
    return state;
};

export default userReducer;