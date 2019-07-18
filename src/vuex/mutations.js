import * as types from "./mutation_types";

export default {
  [types.USERNAME](state, username) {
    state.username = username;
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  }
};
