import axios from 'axios';

export function userRegisterRequest(user) {
    return dispatch => {
        return axios.post('/api/register', user);
    }
}

export function userLoginRequest(user) {
    return dispatch => {
        return axios.post('/api/authenticate', user);
    }
}
