import axios from 'axios';
import { _storeData, _retrieveData } from '../../';
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
  const userToken = await _retrieveData('token');
  axios
    .post(`${REST_API}/post`, data, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(res => {
      dispatch(getPosts());
      NavigationService.navigate('Home');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
