import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from './services/pokemon';
import './App.css';
import FetchingComponent from './fetchingComponent';
import Navbar from './components/navbar';

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

  const loadingPokemon = async data => {
    let allPokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(allPokemonData);
  };




  return (
    <div className="App">
      <Navbar />
      <header>Pokemon API fetching application</header>
      <p>This is a work on progress. The goal is to show all the first 151 pokemon, on individual cards, with data like its type, weight, height, and ability.</p>
      <div>
        {loading ? <h1>Loading...</h1> : <h2>Data has been fetched</h2>}
      </div>
      {/* <FetchingComponent /> */}
    </div>
  );
}

export default App;
