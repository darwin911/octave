import { LOGOUT, SET_EVENTS, SET_USER } from './constants';

import { initialState } from './Store';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
