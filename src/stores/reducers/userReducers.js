import { USER_AUTHENTICATED, USER_SIGNIN, USER_SIGNUP } from '../actions/types';

const initialState = {
  data: {},
  isAuthenticated: false,
  isLoading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        data: payload,
        isAuthenticated: true
      };

    case USER_SIGNIN:
      return {
        ...state,
        data: payload
      };

    case USER_SIGNUP:
      return {
        ...state,
        data: payload,
        isAuthenticated: true
      };

    default:
      return state;
  }
};
