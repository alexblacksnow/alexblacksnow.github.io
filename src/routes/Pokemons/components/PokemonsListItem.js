import React from 'react';

export const PokemonsListItem = pokemon => {
  return (
    <div>
      <h2>Name: {pokemon.name}</h2>
    </div>
  )
};

export default PokemonsListItem;
