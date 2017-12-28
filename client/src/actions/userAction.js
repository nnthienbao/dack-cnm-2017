import axios from 'axios';

export function userRegisterRequest(user) {
    return dispatch => {
        return axios.post('/api/register', user);
    }
}
