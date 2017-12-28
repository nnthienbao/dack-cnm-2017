import axios from 'axios';

export function userRegisterRequest(user) {
    return dispatch => {
        axios.post('/api/register', user)
    }
}
