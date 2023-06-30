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
                        <h3>{item.id}) {toTitleCase(item.name)}</h3>
                        <img className='image' src={`${item.sprites.front_default}`} alt='Pokemon' ></img>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FetchingComponent;
