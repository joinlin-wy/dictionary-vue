import  * as DATA from "../service/getData";

export const state = {
  wordList: [],
  account: '',
  countNumber:10,
  startIndex: 0,
  loaded: false,
  isLogin: false
};
export const mutations = {
  setWords(state, words) {
    state.wordList = words.docs;
    state.loaded = true;
    state.countNumber = words.countNumber;
    state.startIndex = words.startIndex;
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
    let {data} = await DATA.login(params);
    if (data.account) {
      context.commit('setUser', {account: data.account});
    }
    if (data.storage) {
      localStorage.setItem('-words-info-', data.storage);
    }
    return data;
  },
  async logout(context) {
    await DATA.logout();
    context.state.isLogin = false;
    context.state.user = null;
    localStorage.removeItem('-words-info-');
    return true;
  },
  async register(context, params) {
    let {data} = await DATA.register(params);
    if (data.account) {
      context.commit('setUser', {account: data.account});
    }
    if (data.storage) {
      localStorage.setItem('-words-info-', data.storage);
    }
    return data;
  },
  async getWords(context) {
    let data = await DATA.getWords(context.state.account);
    context.commit('setWords', data.data);
    return true;
  },
  async markWord({commit}, index) {
    let data = await DATA.markWord(state.wordList[index]);
    if (data.data.status) {
      commit('markWord', {
        index,
        isMarked: data.data.isMarked
      });
    }
    return data.data.isMarked;
  },
  async getMarkedWords({state}) {
    let {data} = await DATA.getMarkedWords(state.account);
    return data;
  },
  async updateStartIndex({state}){
    let {data} = await DATA.updateStartIndex(state.startIndex + state.countNumber);
    return data;
  },
  async queryWord(context, word) {
    let {data} = await DATA.queryWord(word);
    return data;
  }
};
