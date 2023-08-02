import { 
    getPokemon, 
    getAllPokemon, 
    getSearchedPokemon, 
  } from '../services/pokemon';

export async function previousPage(prevUrl, loadingPokemon, setNextUrl, setPrevUrl, setLoading) {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
};

export async function nextPage(nextUrl, loadingPokemon, setNextUrl, setPrevUrl, setLoading) {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
};

export async function loadingPokemon(data, getPokemon, setPokemonData) {
    let allPokemonData = await Promise.all(
        data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord;
        })
    );
    setPokemonData(allPokemonData);
};

export async function searchPokemonByName(pokemonQuery, setPokemonQueryData, setPokemonSearched) {
    if (pokemonQuery !== '') {
        let data = await getSearchedPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`)
        await setPokemonQueryData(data);
        setPokemonSearched(true);
    }
};
