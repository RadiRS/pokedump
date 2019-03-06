import { combineReducers } from 'redux';
import error from './errorReducers';
import pokemon from './pokemonReducers';
import categories from './categoriesReducers';
import types from './typeReducers';
import user from './userReducers';

export default combineReducers({
  error,
  pokemon,
  categories,
  types,
  user
});
