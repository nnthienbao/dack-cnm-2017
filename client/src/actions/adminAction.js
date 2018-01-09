import axios from 'axios';

export function adminRequestGetStatistics() {
    return dispatch => {
        return axios.get('/api/admin/statistic');
    }
}