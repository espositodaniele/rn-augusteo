import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://phplaravel-358163-3208865.cloudwaysapps.com/api',
});

export default instance;