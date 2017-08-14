import { connect } from 'react-redux';
import {
  fetchPokemonsIfNeeded,
} from '../modules/pokemons';

import Pokemons from '../components/PokemonsView';

const mapDispatchToProps = dispatch => ({
  fetchPokemons: params => dispatch(fetchPokemonsIfNeeded(params)),
});

const mapStateToProps = state => {
  const { pokemons } = state;
  const {
    isFetching,
    lastUpdated,
    items,
    params,
  } = pokemons || {
    isFetching: true,
    pokemonsList: [],
    params: `pokemon/`,
  };

  return {
    params,
    pokemonsList: items,
    isFetching,
    lastUpdated,
  };
};

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
