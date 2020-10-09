import axios from 'axios';
require('dotenv').config()

const chartBaseUrl = process.env.REACT_APP_API_BASE_URL + "chart"

export const getChart = (year, month, type) => {
    let url = `${chartBaseUrl}?year=${year}&month=${month}&type=${type}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
