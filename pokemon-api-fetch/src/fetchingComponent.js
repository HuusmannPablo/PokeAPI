import React, { useState, useEffect } from 'react';
import { toTitleCase } from './utils';

function FetchingComponent() {
    
    const [pokemonData, setPokemonData] = useState([]);
    
    useEffect(() => {
        // fetchPokemonData();
        fetchKantoPokemon();
    }, []);

    function fetchKantoPokemon() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
        // fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function(allpokemon) {
            allpokemon.results.forEach(function(pokemon){
                fetchPokemonData(pokemon);
            });
        });
    };
    
    function fetchPokemonData(pokemon) {
        let url = pokemon.url
    
        fetch(url)
        .then((response) => response.json())
        .then(function(pokeData) {
            setPokemonData((prevData) => [...prevData, pokeData]);
            console.log(pokeData);
        });
    };

    return (
        <>
            <h1>Fetched Data</h1>
            <div className='box'>
                {pokemonData.map((item, index) => (     
                    <div className='pokemon-card' key={index}>
                        <img className='image' src={`${item.sprites.front_default}`} alt='Pokemon' ></img>
                        <h3>{toTitleCase(item.name)}</h3>
                        {/* Type, I need to loop to rpint all */}
                        {/* Weight */}
                        <h5 className='property-title'>Weight</h5>
                        <p className='property-data'>{item.weight}</p>

                        {/* Height */}
                        <h5 className='property-title'>Height</h5>
                        <p className='property-data'>{item.height}</p>
                        
                        {/* Ability */}
                        <h5 className='property-title'>Ability</h5>
                        <p className='property-data'>{item.abilities[0].ability.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FetchingComponent;
