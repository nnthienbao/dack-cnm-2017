import axios from 'axios';

export function adminRequestGetStatistics() {
    return dispatch => {
        return axios.get('/api/admin/statistic');
    }
}

export function adminRequestGetListUser(page, limit) {
    return dispatch => {
        return axios.get(`/api/admin/list/user-account?page=${page}&limit=${limit}`);
    }
}

export function adminRequestGetListTransactionHistory(page, limit) {
    return dispatch => {
        return axios.get(`/api/admin/list/transaction?page=${page}&limit=${limit}`);
    }
}