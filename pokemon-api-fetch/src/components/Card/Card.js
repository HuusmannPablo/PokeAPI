import React from 'react';
import { toTitleCase } from '../../utils';
import typeColors from './pokemonTypes';
import './style.css';

function Card({ pokemon }) {
  return (
    <div className='card'>

        {/* Image of the Pokemon */}
        <div className='card-img'>
            <img className='image' src={`${pokemon.sprites.front_default}`} alt='Pokemon' ></img>
        </div>

        {/* Name */}
        <div className='card-name'>
            {toTitleCase(pokemon.name)}
        </div>

        {/* Types */}
        <div className='card-types'>
            {pokemon.types.map((type, i) => {
                return (
                    <div className='card-type' key={i} style={{ backgroundColor: typeColors[type.type.name] }}>                                    
                        {toTitleCase(type.type.name)}
                    </div>
                )
            })}
        </div>

        {/* Information */}
        <div className='card-property-info'>
            {/* Weight */}
            <h5 className='property-title'>Weight</h5>
            <p className='property-data'>{pokemon.weight}</p>

            {/* Height */}
            <h5 className='property-title'>Height</h5>
            <p className='property-data'>{pokemon.height}</p>

            {/* Ability */}
            <h5 className='property-title'>Ability</h5>
            <p className='property-data'>{pokemon.abilities[0].ability.name}</p>

        </div>
    </div>
  )
}

export default Card