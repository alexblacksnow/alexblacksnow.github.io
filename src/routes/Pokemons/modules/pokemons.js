import axios from 'axios';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_POKEMONS = `REQUEST_POKEMONS`;
export const RECEIVE_POKEMONS = `RECEIVE_POKEMONS`;
export const SELECT_SUBREDDIT = `SELECT_SUBREDDIT`;
export const INVALIDATE_SUBREDDIT = `INVALIDATE_SUBREDDIT`;

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const doubleAsync = () => (dispatch, getState) => new Promise((resolve) => {
//   setTimeout(() => {
//     dispatch({
//       type    : COUNTER_DOUBLE_ASYNC,
//       payload : getState().counter,
//     });
//     resolve();
//   }, 200);
// });

function requestPokemons(params) {
  return {
    type: REQUEST_POKEMONS,
    params,
  };
}

function receivePokemons(params, response) {
  return {
    type: RECEIVE_POKEMONS,
    params,
    pokemons: response.data.results,
    receivedAt: Date.now(),
  };
}

function fetchPokemons(params) {
  return (dispatch) => {
    dispatch(requestPokemons(params));
    return axios.get(`http://pokeapi.co/api/v2/${params}`)
      .then(response => dispatch(receivePokemons(params, response)));
  };
}

function shouldFetchPokemons(state, params) {
  const pokemons = state.pokemons[params];
  if (!pokemons) {
    return true;
  } else if (pokemons.isFetching) {
    return false;
  }
  return pokemons.didInvalidate;
}

export function fetchPokemonsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchPokemons(getState(), params)) {
      return dispatch(fetchPokemons(params));
    }
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_POKEMONS]        : (state, action) =>
    Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    }),
  [RECEIVE_POKEMONS]        : (state, action) =>
    Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.pokemons,
      lastUpdated: action.receivedAt,
    }),

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  didInvalidate: false,
  params: `pokemon/`,
  items: [],
};
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ?
         handler(state, action) :
         state;
}
