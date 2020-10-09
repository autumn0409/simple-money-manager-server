import axios from 'axios';
require('dotenv').config()

const recordBaseUrl = process.env.REACT_APP_API_BASE_URL + "record"

export const getMonthRecord = (year, month) => {

    let url = `${recordBaseUrl}?year=${year}&month=${month}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const createRecord = (newRecord) => {

    let url = recordBaseUrl;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, newRecord).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const editRecord = (modifiedRecord) => {

    let url = recordBaseUrl;

    console.log(`Making POST request to: ${url}`);

    return axios.put(url, modifiedRecord).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const deleteRecord = (id) => {

    let url = `${recordBaseUrl}/${id}`;

    console.log(`Making DELETE request to: ${url}`);

    return axios.delete(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

