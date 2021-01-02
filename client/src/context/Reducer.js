import { LOGOUT, SET_EVENTS, SET_USER, TOGGLE_LOADING } from './constants';

import { initialState } from './Store';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        isLoading: false,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
