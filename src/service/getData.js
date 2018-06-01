import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8800';//'https://iceyue.top/dict';
axios.defaults.withCredentials = true;//开启cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const login = (params) => axios.post('/login', params);
export const logout = (params) => axios.post('/logout', params);
export const register = (params) => axios.post('/register', params);
export const getWords = (account) => axios.get('/getWordsByUser', {params: {account}});
export const queryWord = (word) => axios.get('/queryWord', {params: {word}});
export const markWord = (data) => axios.get('/markWord?word=' + data.word + '&isMarked=' + !!data.isMarked);
export const getMarkedWords = (account) => axios.get('/getMarkedWords?account=' + account);
export const updateStartIndex = (index) => axios.get('/updateStartIndex?index=' + index);
