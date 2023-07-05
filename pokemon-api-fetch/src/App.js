import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from './services/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar'
import Axios from 'axios';
import './App.css';

function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');         // Next Page
  const [prevUrl, setPrevUrl] = useState('');         // Previous Page
  const [loading, setLoading] = useState(true);       // For the loading when fetching
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const previousPage = async () => {
    if(!prevUrl) return;

    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let allPokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(allPokemonData);
  };

  const [pokemonQuery, setPokemonQuery] = useState('');
  const [pokemonSearched, setPokemonSearched] = useState(false);
  const [pokemonQueryData, setPokemonQueryData] = useState({
    name: '',
    img: '',
    types: [],
    weight: '',
    height: '',
    ability: [],
  })

  const searchPokemonByName = () => {
    setLoading(true);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`)
    .then((response) => {
      setPokemonQueryData({
        name: response.data.name,
        img: response.data.sprites.front_default,
        types: response.data.types[0].type.name,
        // types: [response.data.types[0].type.name, response.data.types[1].type.name],
        weight: response.data.weight,
        height: response.data.height,
        ability: response.data.abilities[0].ability.name,
      })
      console.log(pokemonQueryData);
    })
    setLoading(false);
    setPokemonSearched(true);
  }

  console.log(pokemonData);
  return (
      <div>
        <Navbar />
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className='searchbar'>
              <p>Search by name</p>
              <input 
                type='text' 
                placeholder='Type here...' 
                className='search'
                onChange={(e) => setPokemonQuery(e.target.value)}
              />
              <button className='search-button' onClick={searchPokemonByName}>Search</button>
            </div>
            <div className='display-pokemon-chosen'>
              {!pokemonSearched ? (
                <h1>not</h1>
                ) : (
                <>
                  <h1>{pokemonQueryData.name}</h1> 
                  <Card pokemon={pokemonQueryData} />
                </>
              )}
            </div>
            <div className='button'>
              <button onClick={previousPage}>Previous Page</button>
              <button onClick={nextPage}>Next Page</button>
            </div>
            <div className='grid-container'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className='button'>
              <button onClick={previousPage}>Previous Page</button>
              <button onClick={nextPage}>Next Page</button>
            </div>
          </>
        )}
      </div>
  );
}

export default App;
