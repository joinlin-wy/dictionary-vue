import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8888/';
axios.defaults.withCredentials = true;//开启cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const login = (params)=> axios.post('/login',params);
export const logout = (params)=> axios.post('/logout',params);
export const register = (params)=> axios.post('/register',params);
export const getWords = (account)=> axios.get('/getWordsByUser',{params:{account}});
export const queryWord = ()=> axios.get('/queryWords');
export const markWord = (data)=> axios.get('/markWord?word='+data.word+'&isMarked='+!!data.isMarked);
export const getMarkedWords = (account)=> axios.get('/getMarkedWords?account='+account);
