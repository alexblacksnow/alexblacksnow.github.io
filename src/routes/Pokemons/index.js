import { injectReducer } from '../../store/reducers';

export default store => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PokemonsView = require(`./containers/PokemonsContainer`).default;
      const reducer = require(`./modules/pokemons`).default;

      injectReducer(store, { key: `pokemons`, reducer });

      cb(null, PokemonsView);
    }, `pokemons`);
  },
});
