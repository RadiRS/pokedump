import axios from 'axios';
import { REST_API } from '../../services/api';
import { GET_TYPES } from './types';

export const getTypes = () => async dispatch => {
  axios
    .get(`${REST_API}/types`)
    .then(res => {
      dispatch({
        type: GET_TYPES,
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
