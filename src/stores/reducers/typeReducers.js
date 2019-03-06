import { GET_TYPES } from '../actions/types';

const initialState = {
  data: [],
  result: {},
  isLoading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TYPES:
      return {
        ...state,
        data: payload,
        isLoading: false
      };

    default:
      return state;
  }
};
