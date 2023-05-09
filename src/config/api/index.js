import axios from 'axios';

/**
 * Public API connection
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const API_URL = axios.create({
    baseURL: process.env.API_URL
});
