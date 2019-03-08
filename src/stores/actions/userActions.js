import axios from 'axios';
import NavigationService from '../../navigator/NavigationServices';
import { REST_API } from '../../services/api';
import {
  _storeData,
  _retrieveData,
  _removeData
} from '../../helpers/asynStorage';
import {
  GET_ERRORS,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_AUTHENTICATED
} from './types';

export const authenticatedUser = () => async dispatch => {
  const userToken = await _retrieveData('token');
  axios
    .get(`${REST_API}/user`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(res => {
      // NavigationService.navigate('Home');
      dispatch({
        type: USER_AUTHENTICATED,
        payload: res.data[0]
      });
    })
    .catch(err => {
      // NavigationService.navigate('Signin');
    });
};

export const signupUser = data => dispatch => {
  axios
    .post(`${REST_API}/signup`, data)
    .then(res => {
      _storeData('token', res.data.token);
      NavigationService.navigate('Signin');
      dispatch({
        type: USER_SIGNUP,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signinUser = data => dispatch => {
  axios
    .post(`${REST_API}/signin`, data)
    .then(res => {
      _storeData('token', res.data.token);
      dispatch({
        type: USER_SIGNIN,
        payload: res.data
      });
      NavigationService.navigate('AddPokemon');
    })
    .catch(err => {
      // alert(JSON.stringify(err));
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};

export const logoutUser = () => async dispatch => {
  await _removeData('token');
  NavigationService.navigate('Home');
};
