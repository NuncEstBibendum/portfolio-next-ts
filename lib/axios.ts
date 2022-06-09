import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://portfolio-julien-gg.herokuapp.com/api',
});
