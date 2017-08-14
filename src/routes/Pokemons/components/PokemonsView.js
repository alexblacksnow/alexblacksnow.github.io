import React, { Component } from 'react';


import './PokemonsView.scss';
import { PokemonsListItem } from './PokemonsListItem';

// export const PokemonsView = pokemonsList => (
//   <div>
//     <h4>Welcome!</h4>
//     <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
//     {
//       pokemonsList.map(pokemon =>
//         <PokemonsListItem key={pokemon.id} {...{ pokemon }} />,
//       )
//     }
//   </div>
// );

// export default PokemonsView;


export default class PokemonsView extends Component {
  componentDidMount() {
    const { fetchPokemons, params } = this.props;
    fetchPokemons(params);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      const { fetchPokemons, params } = this.props;
      fetchPokemons(params);
    }
  }

  // handleChange(nextSubreddit) {
  //   this.props.dispatch(selectSubreddit(nextSubreddit));
  //   this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  // }

  // handleRefreshClick(e) {
  //   e.preventDefault();

  //   const { dispatch, selectedSubreddit } = this.props;
  //   dispatch(invalidateSubreddit(selectedSubreddit));
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit));
  // }

  render() {
    const { params, pokemonsList, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {` `}
            </span>}
          {!isFetching &&
            <a href='' onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && pokemonsList.length === 0 && <h2>Loading...</h2>}
        {!isFetching && pokemonsList.length === 0 && <h2>Empty.</h2>}
        {pokemonsList.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {pokemonsList.map(pokemon =>
              <PokemonsListItem key={pokemon.name} {...pokemon} />,
            )}
          </div>}
      </div>
    );
  }
}

