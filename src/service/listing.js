import { API_URL } from '~/config/api';

export async function getListings() {
    try {
        const response = await API_URL.get('typicode/demo/posts');

        return response;
    } catch (err) {
        return false;
    }
}

export async function getComments() {
    try {
        const response = await API_URL.get('typicode/demo/comments');

        return response;
    } catch (err) {
        return false;
    }
}

export async function postListings(data) {
    try {
        const response = await API_URL.post('typicode/demo/posts', data);

        return response;
    } catch (err) {
        return false;
    }
}

export async function postComments(data) {
    try {
        const response = await API_URL.post('typicode/demo/comments', data);

        return response;
    } catch (err) {
        return false;
    }
}

export async function updateListings(data) {
    try {
        const response = await API_URL.put(`typicode/demo/posts/${data.id}`, data);

        return response;
    } catch (err) {
        return false;
    }
}

export async function updateComments(data) {
    try {
        const response = await API_URL.put(`typicode/demo/comments/${data.id}`, data);

        return response;
    } catch (err) {
        return false;
    }
}
