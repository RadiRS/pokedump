import { GET_POKEMONS, GET_POKEMON } from '../actions/types';

const initialState = {
  data: [],
  dataSearch: [],
  result: {},
  isLoading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        data: payload,
        isLoading: false
      };

    case 'SEARCH_POKEMON':
      return {
        ...state,
        dataSearch: payload,
        isLoading: false
      };

    case GET_POKEMON:
      return {
        ...state,
        result: payload,
        isLoading: false
      };

    default:
      return state;
  }
};
