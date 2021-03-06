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

export function userRequestTransaction(data) {
    return dispatch => {
        return axios.post('/api/transaction/request', data);
    }
}

export function userConfirmTransaction(data) {
    return dispatch => {
        return axios.post('/api/transaction', data);
    }
}

export function userGetRechargeHistory() {
    return dispatch => {
        return axios.get('/api/history/recharge')
    }
}

export function userGetWithdrawHistory() {
    return dispatch => {
        return axios.get('/api/history/withdraw')
    }
}

export function getInfoTransaction(ref) {
    return dispatch => {
        return axios.get(`/api/transaction/${ref}`);
    }
}

export function userRequestCancelTransaction(ref) {
    return dispatch => {
        return axios.delete(`/api/transaction/${ref}`);
    }
}








