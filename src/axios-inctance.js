import axios from 'axios';

const inctance = axios.create({
    baseURL: 'https://react-burger-9bf08.firebaseio.com/'
})

export default inctance;