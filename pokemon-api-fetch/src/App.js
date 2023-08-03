import React, { useState, useEffect } from 'react';
import { 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { 
  getPokemon, 
  getAllPokemon, 
  getSearchedPokemon, 
} from './services/pokemon';
import typesInfo from './texts/pokemonTypes';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import './App.css';

var searchNameData = require("./pokemonData.json");

function App() {

  // For rendering depending on selection
  const [selectedButton, setSelectedButton] = useState('')

  // Functionality for showing all the Pokemon, 20 per page
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Functionality for searching one Pokemon
  const [pokemonQuery, setPokemonQuery] = useState('');
  const [pokemonSearched, setPokemonSearched] = useState(false);
  const [pokemonQueryData, setPokemonQueryData] = useState({});

  // Functionality for autocomplete
  const [searchValue, setSearchValue] = useState('');

  // FUnctionality for selecting type
  const [type, setType] = useState('');

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

  const searchPokemonByName = async () => {   
      console.log('Search started')
      if (pokemonQuery !== '') {
        let data = await getSearchedPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`)
        await setPokemonQueryData(data);
        setPokemonSearched(true);
      }
      console.log('Search done')
  };

  const onChange = (event) => {
    setSearchValue(event.target.value);
    setPokemonQuery(event.target.value);
  };
  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    setPokemonQuery(searchTerm);
    console.log(searchTerm, 'selected');
  };

  return (
    <div>
      <Navbar />
      <div className='button-container'>
        <Button
          key={'button-name'}
          variant='contained'
          style={{
            width: '200px',
          }}
          size='large'
          onClick={() => setSelectedButton('searchNameMode')}
        >
          Search by name
        </Button>
        <Button
          key={'button-type'}
          variant='contained'
          style={{
            width: '200px',
          }}
          size='large'
          onClick={() => setSelectedButton('searchTypeMode')}
        >
          Search by type
        </Button>
        <Button
          key={'button-list'}
          variant='contained'
          style={{
            width: '200px',
          }}
          size='large'
          onClick={() => setSelectedButton('listMode')}
        >
          Catch 'em all
        </Button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {selectedButton === 'searchNameMode' ? (
            <>
              <div className='searchbar'>
                <p>Search by name or number</p>
                <button className='search-button' onClick={searchPokemonByName}>Search</button>
                <input
                  type='text'
                  placeholder='Type here...'
                  className='search'
                  value={searchValue}
                  onChange={onChange}
                />
                <div className='dropdown'>
                  {searchNameData
                    .filter(item => {
                      const searchTerm = searchValue.toLowerCase();
                      const name = item.name.toLowerCase();

                      return searchTerm && name.includes(searchTerm) && name !== searchTerm
                    })
                    .slice(0, 10)
                    .map((item) => (
                      <div
                        className='dropdown-row'
                        onClick={() => onSearch(item.name)}
                        key={item.name}
                      >
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </div>
                    ))}
                </div>
              </div>
              <div className='card-container'>
                {!pokemonSearched || pokemonQueryData === undefined ? (
                  <></>
                ) : (
                  <>
                    <Card pokemon={pokemonQueryData} />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
            </>
          )}
          {selectedButton === 'searchTypeMode' ? (
            <>
              <div className='type-dropdown-menu'>
                <FormControl 
                  variant='outlined' 
                  sx={{ 
                    m: 1, 
                    minWidth: 200, 
                    maxWidth: 300, 
                    textAlign: 'center', 
                  }}
                  size='small'
                >
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={type}
                    label="Type"
                    onChange={setType}
                    autoWidth
                    sx={{ maxHeight: 250, overflow: 'auto' }}
                  >
                    {typesInfo.map((type, id) => (
                      <MenuItem 
                        key={id} 
                        value={type.name}
                      >
                        {/* <img src=`{type.icon}`></img> */}
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </div>
            </>
            ) : (
              <>
              </>
          )}
          {selectedButton === 'listMode' ? (
            <>
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
          ) : (
            <>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
