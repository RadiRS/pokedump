import axios from 'axios';
import { _storeData, _retrieveData } from '../../helpers/asynStorage';
import { REST_API } from '../../services/api';
import { GET_POKEMONS, GET_ERRORS, GET_POKEMON } from './types';

export const getPokemons = () => async dispatch => {
  axios
    .get(`${REST_API}/pokemons`)
    .then(res => {
      dispatch({
        type: GET_POKEMONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      });
    });
};

export const getPokemon = data => async dispatch => {
  axios
    .get(`${REST_API}/pokemons/${data.id}`)
    .then(res => {
      dispatch({
        type: GET_POKEMON,
        payload: res.data[0]
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      });
    });
};

export const addPokemon = data => async dispatch => {
  axios
    .post(`${REST_API}/pokemons`, data)
    .then(res => {
      dispatch(getPokemon());
      NavigationService.navigate('Home');
    })
    .catch(err => {
      alert(JSON.stringify(err.message));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
