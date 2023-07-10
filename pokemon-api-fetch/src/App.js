import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon, getSearchedPokemon } from './services/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar'
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
  const [pokemonQueryData, setPokemonQueryData] = useState({});

  const searchPokemonByName = async () => {   
    
    // I need to add a functionality for when I get a 404 response. i.e. misspelled name
    
    setLoading(true);

    // Asynchronous function to get response
    let data = await getSearchedPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`)
    await setPokemonQueryData(data);
      
    setLoading(false);
    setPokemonSearched(true);
  };

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
            <div className='card-container'>
              {!pokemonSearched ? (
                <h1>not</h1>
                ) : (
                <>
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
