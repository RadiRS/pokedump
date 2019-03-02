import { combineReducers } from 'redux';
import error from './errorReducers';
import pokemon from './pokemonReducers';

export default combineReducers({
  error,
  pokemon
});
