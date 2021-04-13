import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-83c3a-default-rtdb.firebaseio.com/'
});

export default instance;