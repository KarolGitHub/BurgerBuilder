import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-46554.firebaseio.com'
});

export default instance;