import axios from 'axios';
require('dotenv').config()

const categoryBaseUrl = process.env.REACT_APP_API_BASE_URL + "category"

export const getCategories = () => {
    let url = categoryBaseUrl;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const createCategory = (type, name) => {

    let url = `${categoryBaseUrl}?type=${type}&name=${name}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { type, name }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const deleteCategory = (type, name) => {

    let url = `${categoryBaseUrl}?type=${type}&name=${name}`;

    console.log(`Making DELETE request to: ${url}`);

    return axios.delete(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}