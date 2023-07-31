export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
    });
};

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
    })
};

export async function getSearchedPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                return response.json()
                } else if(response.status === 404) {
                return Promise.reject('error 404')
                } else {
                return Promise.reject('some other error: ' + response.status)
                }
            })

            // .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            // put here in the catch what I want to do with
            // after the 404
            .catch(error => console.log('error is', error));



            // .catch(error => resolve('https://pokeapi.co/api/v2/pokemon/charmander'))
            // .catch(error => console.log(error))
    })
};
