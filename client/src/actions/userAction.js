import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthorizationToken from '../Utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actionType';

export function userRegisterRequest(user) {
    return dispatch => {
        return axios.post('/api/register', user);
    }
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function userLoginRequest(user) {
    return dispatch => {
        return axios.post('/api/authenticate', user)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwt_decode(token)));
            })
    }
}

export function userVerifyEmailRequest(data) {
    return dispatch => {
        return axios.post('/api/verify', data);
    }
}

export function userResendTokenVerifyAccountRequest(username) {
    return dispatch => {
        return axios.post('/api/resend-token-verify', {username});
    }
}
