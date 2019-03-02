import axios from 'axios';
import { REST_API } from '../../services/api';
import { GET_CATEGORIES } from './types';

export const getCategories = () => async dispatch => {
  axios
    .get(`${REST_API}/categories`)
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
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
