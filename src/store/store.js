import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_URL} from '../constants'
import * as types from './mutation.types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
    repos: [],
    err: null,
    spinner: true,
    window: {
      width: 0,
      height: 0
    }
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.repos = [];
      state.err = null;
      state.data = payload;
    },
    [types.SET_ERR](state, payload) {
      state.err = payload;
      state.data = null;
      state.repos = [];
    },
    [types.SET_REPOS](state, payload) {
      state.repos = payload;
    },
    [types.SET_SPINNER](state, payload) {
      state.spinner = payload;
    },
    [types.SET_WINDOW_SIZE](state, payload) {
      state.window = {
        ...payload
      }
    }
  },
  actions: {
    getUser({commit}, payload) {
      commit(types.SET_SPINNER, true);
      axios.get(`${API_URL}/users/${payload}`)
        .then(res => {
          commit(types.SET_USER, res.data);
          commit(types.SET_SPINNER, false);
        })
        .catch(err => {
          console.log(err.message);
          commit(types.SET_ERR, err.message);
          commit(types.SET_SPINNER, false);
        })
    },
    getRepos({commit}, payload) {
      axios.get(`${API_URL}/users/${payload}/repos`)
        .then(res => {
          commit(types.SET_REPOS, res.data);
      })
    }
  }
})
