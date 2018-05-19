import {getWords, login, logout, markWord, register, getMarkedWords} from "../service/getData";

export const state = {
  wordList: [],
  account: '',
  loaded: false,
  isLogin: false
};
export const mutations = {
  setWords(state, words) {
    words.forEach((value) => {
      if (!value.isMarked) {
        value.isMarked = false;
      }
    });
    state.wordList = words;
    state.loaded = true;
  },
  markWord(state, info) {
    state.wordList[info.index].isMarked = info.isMarked;
  },
  setUser(state, user) {
    state.account = user.account;
    localStorage.setItem('-words-account-', JSON.stringify(user));
    state.isLogin = true;
  }
};
export const actions = {
  async login(context, params) {
    let {data} = await login(params);
    if (data.account) {
      context.commit('setUser', {account: data.account});
    }
    if (data.storage) {
      localStorage.setItem('-words-info-', data.storage);
    }
    return data;
  },
  async logout(context) {
    await logout();
    context.state.isLogin = false;
    context.state.user = null;
    localStorage.removeItem('-words-info-');
  },
  async register(context, params) {
    let {data} = await register(params);
    if (data.account) {
      context.commit('setUser', {account: data.account});
    }
    if (data.storage) {
      localStorage.setItem('-words-info-', data.storage);
    }
    return data;
  },
  async getWords(context) {
    let data = await getWords(context.state.account);
    context.commit('setWords', data.data.docs);
    return true;
  },
  async markWord({commit}, index) {
    let data = await markWord(state.wordList[index]);
    if (data.data.status) {
      commit('markWord', {
        index,
        isMarked: data.data.isMarked
      });
    }
    return data.data.isMarked;
  },
  async getMarkedWords(context){
    let {data} = await getMarkedWords(context.state.account);
    return data;
  }
  
};
