import axios from 'axios';
import { Platform } from 'react-native';
import { _storeData, _retrieveData } from '../../helpers/asynStorage';
import { REST_API } from '../../services/api';
import { GET_POKEMONS, GET_ERRORS, GET_POKEMON } from './types';
import NavigationService from '../../navigator/NavigationServices';

export const getPokemons = (search = '') => async dispatch => {
  axios
    .get(`${REST_API}/pokemons?search=${search}`)
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

// export const searchPokemon = (search = '') => async dispatch => {
//   axios
//     .get(`${REST_API}/pokemons?search=${search}`)
//     .then(res => {
//       dispatch({
//         type: 'SEARCH_POKEMON',
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.message
//       });
//     });
// };

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

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('file_upload', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const addPokemon = data => async dispatch => {
  // const body = {
  //   file_upload: createFormData(data.image_url, { user_id: data.user_id })
  // };
  // alert(JSON.stringify(body));
  // const image_url = await axios.post(`${REST_API}/upload`, body);

  const image = new FormData();
  image.append('file_upload', {
    uri: data.image_url.uri,
    type: 'image/jpeg', // or photo.type
    name: data.image_url.fileName
  });

  axios({
    method: 'POST',
    url: `${REST_API}/upload`,
    data: image,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
    .then(response => {
      // console.warn(JSON.stringify(response.data.imageUrl.fileName));
      alert(JSON.stringify(response.data.image_url.fileName));
    })
    .catch(err => {
      alert(JSON.stringify(err));
    });

  // axios
  //   .post(`${REST_API}/pokemons`, data)
  //   .then(res => {
  //     dispatch(getPokemons());
  //     NavigationService.navigate('Home');
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};

export const deletePokemon = data => async dispatch => {
  axios
    .delete(`${REST_API}/pokemons/${data.id}`)
    .then(res => {
      dispatch(getPokemons());
      NavigationService.navigate('Home');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updatePokemon = data => async dispatch => {
  let item = data;
  axios
    .patch(`${REST_API}/pokemons/${data.id}`, data)
    .then(res => {
      // alert(JSON.stringify(res.data));
      dispatch(getPokemons());
      // NavigationService.navigate('UpdatePokemon', { item });
      NavigationService.navigate('Home');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// fetch(`${REST_API}/upload`, {
//   method: 'POST',
//   body: image
// })
//   .then(response => {
//     // alert('Upload success!');
//     // console.warm(`upload success ${JSON.stringify(response)}`);
//     // this.setState({ photo: null });
//     alert(JSON.stringify(response));
//   })
//   .catch(error => {
//     // alert('Upload failed!');
//     // console.warm(JSON.stringify(error));
//     alert(JSON.stringify(error));
//   });
