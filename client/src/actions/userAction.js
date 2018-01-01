import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthorizationToken from '../Utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_INFO_USER } from '../actionType';

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
        return axios.post('/api/user/verify', data);
    }
}

export function userResendTokenVerifyAccountRequest(username) {
    return dispatch => {
        return axios.post('/api/user/resend-token-verify', {username});
    }
}

export function userRequestResetPassword({ email, responseCaptcha }) {
    return dispatch => {
        return axios.post('/api/user/request-reset-password', { email, responseCaptcha });
    }
}

export function userResetPassword({ token, passwordNew, rePasswordNew }) {
    return dispatch => {
        return axios.post('/api/user/reset-password', { token, passwordNew, rePasswordNew });
    }
}

export function setInfoUserAuth(user) {
    return {
        type: SET_INFO_USER,
        user
    }
}

export function userRequestGetInfo() {
    return dispatch => {
        return axios.get('/api/user', {}).then(res => {
            dispatch(setInfoUserAuth(res.data));
        })
    }
}








